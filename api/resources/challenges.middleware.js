//check for the required fields

module.exports.checkAndExtractChallengesFieldsMiddlewareFactory =
function checkAndExtractChallengesFieldsMiddlewareFactory({ strict } = { strict: false }) {
  return function (req, res, next) {
    const { title, details, prize, finalDate, image, userId } = req.body || {};
    if (strict && (!title || !prize || !finalDate || !userId)) {
      return void next(new Error('BAD_REQUEST'));
    }
    req.body = { title, details, prize, finalDate, image, userId };
    next();
  };
};