//check if the client provided more fields than we need

module.exports.checkAndExtractUserFieldsMiddlewareFactory =
  function checkAndExtractUserFieldsMiddlewareFactory({ strict } = { strict: false }) {
    return function (req, res, next) {
      const { username, firstName, lastName, email, password } = req.body || {};
      if (strict && (!username || !email || !password)) {
        return void next(new Error('BAD_REQUEST'));
      }
      req.body = { username, firstName, lastName, email, password };
      next();
    };
  };