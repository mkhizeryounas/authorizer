const Authorizer = require('../lib/authorizer');

const authorizer = new Authorizer({
  url: 'http://localhost:8090/user/',
});

const req = {
  headers: {
    authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9vZk9mTGlmZSI6eyJmcm9udEltYWdlIjoiaHR0cHM6Ly9pbWd1ci5jb20vUnpaNXlUYiIsImxlZnRJbWFnZSI6Imh0dHBzOi8vaW1ndXIuY29tL1J6WjV5VGIiLCJyaWdodEltYWdlIjoiaHR0cHM6Ly9pbWd1ci5jb20vUnpaNXlUYiJ9LCJhdHRyaWJ1dGVzIjp7InB1cnBvc2VPZkFjY291bnQiOiJTQUxBUlkiLCJzb3VyY2VPZkluY29tZSI6IlNFTEYgRU1QTE9ZTUVOVCIsIm1vbnRobHlBcHByb3hUeG4iOjEwMDB9LCJpc1ZhcmlmaWVkIjpmYWxzZSwiX2lkIjoiNWZlNjc4YzM5ZGNhMmQwMDM1NzAzZDNiIiwiZmlyc3ROYW1lIjoiS2hpemVyIiwibGFzdE5hbWUiOiJZb3VuYXMiLCJwaG9uZSI6IjAzMjE1NDA5OTEwIiwiZW1haWwiOiJraGl6ZXJAc2hvcGRldi5jbyIsImNuaWMiOiIzNTIwMjgyNjMwMzA5IiwiY3JlYXRlZEF0IjoiMjAyMC0xMi0yNVQyMzo0MTo1NS42MjRaIiwidXBkYXRlZEF0IjoiMjAyMC0xMi0yNVQyMzo0MTo1NS42MjRaIiwiX192IjowLCJpYXQiOjE2MDg5Mzk3MTl9.Ntoc9SxH6gEex0Hl-gESre-ahkb9WRvSrU1OAwcMtMXrxWJZ3u06ccUPblTtX5Kv6xp8aKcyw4fDWxF5K20tsA`,
  },
};

(async () => {
  authorizer.middleware(req, {}, () => {
    console.log('DONE');
  });
  await new Promise((res) => setTimeout(res, 1000));
  authorizer.middleware(req, {}, () => {
    console.log('DONE');
  });
})();
