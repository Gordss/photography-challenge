//check for the required fields

module.exports.checkAndExtractUserFieldsMiddlewareFactory =
function checkAndExtractUserFieldsMiddlewareFactory({ strict } = { strict: false }) {
  return function (req, res, next) {
    const { title, details, finalDate, image, userId } = req.body || {};
    if (strict && (!title || !finalDate || !userId)) {
      return void next(new Error('BAD_REQUEST'));
    }
    req.body = { title, details, finalDate, image, userId };
    next();
  };
};