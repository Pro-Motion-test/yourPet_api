const { responseTemplates } = require('../constants');
const services = require('../services');

class Auth {
  constructor() {}
  static async register(req, res, next) {
    try {
      const createdUser = await services.Auth.registration(req.body);
      //  --RESPONSE--
      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
  static async login(req, res, next) {
    try {
      const ourUser = await services.Auth.login(req.body);
      //  --RESPONSE--
      res.status(200).json({
        response: {
          ...responseTemplates.SUCCESS_POST_RESPONSE,
          message: 'Login is successfully completed',
        },
        body: ourUser,
      });
    } catch (e) {
      next(e);
    }
  }
  static async logout(req, res, next) {
    try {
      console.log(req.user);
      const logoutUser = await services.Auth.logout(req.user.id);
      //  --RESPONSE--
      res.status(201).json({
        response: {
          ...responseTemplates.SUCCESS_POST_RESPONSE,
          message: 'Logout is successfully completed',
        },
        body: logoutUser,
      });
    } catch (e) {
      next(e);
    }
  }
  static async current(req, res, next) {
    const { user } = req;
    try {
      const currentUser = await services.Auth.current(user.id);
      //  --RESPONSE--
      res.status(200).json({
        response: {
          ...responseTemplates.SUCCESS_GET_RESPONSE,
          message: 'Current user successfully found',
        },
        body: currentUser,
      });
    } catch (e) {
      next(e);
    }
  }
  static async refreshing(req, res, next) {
    const { body } = req;

    try {
      const newTokens = await services.Auth.refreshing(body);

      //  --RESPONSE--
      res.status(201).json({
        responce: {
          ...responseTemplates.SUCCESS_POST_RESPONSE,
          message: 'New access and refresh tokens generated',
        },
        body: newTokens,
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateData(req, res, next) {
    const { body, user, file } = req;
    try {
      const updatedUserData = await services.Auth.updateData(user.id, {
        body,
        file,
      });

      //  --RESPONSE--
      res.status(200).json({
        response: { ...responseTemplates.SUCCESS_PUT_RESPONSE },
        body: updatedUserData,
      });
    } catch (e) {
      next(e);
    }
  }
  static async verify(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}
module.exports = Auth;
