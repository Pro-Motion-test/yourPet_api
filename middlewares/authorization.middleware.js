const { AuthHelper, HttpException } = require('../helpers');

class Authorization {
  static async baseAuth(req, res, next) {
    const { headers } = req;
    try {
      const headerWithToken = headers.Authorization || headers.authorization;
      console.log(headerWithToken);
      const { id, email } = await AuthHelper.validateToken(headerWithToken);
      req.user = { id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Authorization;
