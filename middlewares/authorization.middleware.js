const { AuthHelper } = require('../helpers');

class Authorization {
  static async baseAuth(req, res, next) {
    const { headers } = req;
    try {
      const token = await AuthHelper.extractTokenFromHeader(headers);
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
      const accessToken = await AuthHelper.extractTokenFromHeader(headers);
      //  tokenType could be 'access' or 'refresh' and  'token' by default!
      const { id, email } = await AuthHelper.validateToken({
        tokenType: 'access',
        token: accessToken,
      });
      req.user = { id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
  static async checkRefreshToken(req, res, next) {
    const { refreshToken } = req.body;
    try {
      const userData = await AuthHelper.validateToken({
        tokenType: 'refresh',
        token: refreshToken,
      });
      req.user = { ...userData };
      return next();
    } catch (e) {
      next(e);
    }
  }
  static async checkTokenForPublicRoute(req, res, next) {
    const { headers } = req;
    try {
      if (!headers.Authorization && !headers.authorization) {
        req.user = { isUserLoggedIn: false };
        return next();
      }

      const token = await AuthHelper.extractTokenFromHeader(headers);
      if (!token) {
        return next();
      }
      //  tokenType could be 'access' or 'refresh' and  'token' by default
      const { id, email } = await AuthHelper.validateToken({
        tokenType: 'access',
        token,
      });

      req.user = { isUserLoggedIn: true, id, email };
      return next();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Authorization;
