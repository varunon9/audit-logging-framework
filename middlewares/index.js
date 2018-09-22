const statusCode = require('../constants/statusCode');

module.exports = {

  requireParameters: function(paramList) {
    return function(req, res, next) {
      const { body, query } = req;

      const missing = {};

      paramList.forEach(param => {
        if (!body.hasOwnProperty(param) && !query.hasOwnProperty(param)) {
          missing[param] = `${param} is required`;
        }
      });

      if (Object.keys(missing).length !== 0) {
        return res.status(statusCode.BAD_REQUEST).json({
          success: false,
          message: 'missing params',
          errors: missing
        });
      }

      return next();
    };
  }
};
