const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const axios = require('axios');

const authorizerCache = new NodeCache({ stdTTL: 60 * 60 }); // 1 hour TTL

class Authorizer {
  opts = {};

  constructor({ url, path = '.well-known/jwks.json', key = 'data.publicKey' }) {
    this.opts.url = url;
    this.opts.path = path;
    this.opts.key = key;
  }

  verify = async ({ token }) => {
    let publicKey = await this.getPublicKey();
    console.log({ token, publicKey });
    try {
      return await jwt.verify(token, publicKey);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  extractKeyFromJson = ({ json, key }) => {
    if (!key.length) return json;
    let toPopKey = key.shift();
    return this.extractKeyFromJson({ json: json[toPopKey], key });
  };

  getPublicKey = async () => {
    const CACHE_KEY = 'authorizerPublicKey';
    let publicKey = authorizerCache.get(CACHE_KEY);
    if (!publicKey) {
      let jwkData = (
        await axios.get(
          (this.opts.url.endsWith('/') ? this.opts.url : this.opts.url + '/') +
            this.opts.path
        )
      ).data;
      publicKey = this.extractKeyFromJson({
        json: jwkData,
        key: this.opts.key.split('.'),
      });
      authorizerCache.set(CACHE_KEY, publicKey);
    }
    return publicKey.toString('ssh');
  };

  middleware = async (req, res, next) => {
    try {
      let authHeader = req.headers['authorization'] || '';
      if (typeof authHeader !== 'undefined' && authHeader.includes('Bearer ')) {
        authHeader = authHeader.replace('Bearer ', '');
        const decode = await this.verify({ token: authHeader });
        if (!decode) {
          throw Error('Invalid access token');
        }
        req.user = decode;
        return next();
      } else {
        throw Error('Authorization header not passed');
      }
    } catch (err) {
      console.log('Error in authorizer fn', err);
      return res.status(401).json({
        responseStatus: 'UNAUTHORIZED',
        message: err.message,
        success: false,
        error: {},
      });
    }
  };
}

module.exports = Authorizer;
