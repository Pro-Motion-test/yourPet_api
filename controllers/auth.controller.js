class Auth {
  constructor() {}
  static async register(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(201).json();
    } catch (e) {
      next(e);
    }
  }
  static async login(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
  static async logout(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
  static async current(req, res, next) {
    try {
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
