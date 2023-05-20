const { providers } = require('../providers');
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
      await services.Auth.login(req.body);
      //  --RESPONSE--
      res.status(200).json({message: 'You are successfully logged in'});
    } catch (e) {
      next(e);
    }
  }
  static async logout(req, res, next) {
    try {
      const { id } = req.user;
      await services.Auth.logout(id)
      //  --RESPONSE--
      res.status(200).json({message: 'You are successfully logged out'});
    } catch (e) {
      next(e);
    }
  }
  static async current(req, res, next) {
    try {
      const { id } = req.user;
      await services.Auth.current(id);
      //  --RESPONSE--
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
  static async refreshing(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(201).json();
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
