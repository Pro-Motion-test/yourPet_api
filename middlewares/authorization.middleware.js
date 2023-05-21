const { AuthHelper, HttpException } = require('../helpers');

class Authorization {
  static async baseAuth(req, res, next) {
    const { headers } = req;
    try {
      const token = await AuthHelper.getTokenWithHeader(headers);
      //  tokenType could be 'access' or 'refresh' and  'token' by default
      const { id, email } = await AuthHelper.validateToken({
        tokenType: 'token',
        token,
      });
      req.user = { id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
  static async accessTokenAuth(req, res, next) {
    const { headers } = req;
    try {
      const token = await AuthHelper.getTokenWithHeader(headers);
      //  tokenType could be 'access' or 'refresh' and  'token' by default
      const { id, email } = await AuthHelper.validateToken({
        tokenType: 'access',
        token,
      });
      req.user = { id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }

  static async checkTokenForPublicRoute(req, res, next) {
    const { headers } = req;
    try {
      const token = await AuthHelper.getTokenWithHeader(headers);
      //  tokenType could be 'access' or 'refresh' and  'token' by default
      const { id, email } = await AuthHelper.verifyToken({
        tokenType: 'token',
        token,
      });
      if (!id) {
        req.user = { isUserLoggedIn: false };
        return next();
      }
      req.user = { isUserLoggedIn: true, id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Authorization;
