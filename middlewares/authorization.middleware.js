const { AuthHelper } = require('../helpers');

class Authorization {
  static async baseAuth(req, res, next) {
    const { headers } = req;
    try {
      const token = headers.Authorization || headers.authorization;
      console.log(token);
      const { id, email } = await AuthHelper.validateToken(token);
      req.user = { id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Authorization;
