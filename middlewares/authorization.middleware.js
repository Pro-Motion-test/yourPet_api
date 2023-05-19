const { AuthHelper } = require('../helpers');

class Authorization {
  static async baseAuth(req, res, next) {
    const { headers } = req;
    try {
      const token = headers.Authorization || headers.authorization;
      const { _id, email } = await AuthHelper.validateToken(token);
      req.user = { id: _id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Authorization;
