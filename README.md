# Authorizer

This is a authorization library for microservices architecture using JWT

## Getting started

### Initialize context

```javascript
const authorizer = new Authorizer({
  url: 'http://localhost:8090/user/',
});
```

### Use in an express route

```javascript
router.get(
  '/protected-route',
  authorizer.middleware,
  async (res, res, next) => {
    res.send('OK');
  }
);
```

## Contributing

Feel free to submit pull requests.

## Authors

Khizer Younas - Initial work - [mkhizeryounas](http://github.com/mkhizeryounas)

## Licensing

The project is [MIT Licenced](./LICENSE.txt).
