const { HttpException } = require('../helpers');
const services = require('../services');

class Notice {
  constructor() {}
  static async getAll(req, res, next) {
    try {
      const { query } = req;
      const { id: userId } = req.user;

      const response = await services.Notices.getAll({ query, userId });

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id: noticeId } = req.params;
      const { id: userId } = req.user;

      const response = await services.Notices.getById({ noticeId, userId });

      res.send(response);
    } catch (error) {
      next(error);
    }
  }
  static async createNotice(req, res, next) {
    try {
      const { body, file } = req;
      const { id: owner } = req.user;

      console.log('controller');

      if (!file) {
        throw HttpException.NOT_FOUND('No file uploaded');
      }

      await services.Notices.createNotice({ body, owner, imgUrl: file.path });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
  static async removeNotice(req, res, next) {
    try {
      const { id: noticeId } = req.params;
      const { id: userId } = req.user;

      await services.Notices.removeNotice({ noticeId, userId });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  static async getMy(req, res, next) {
    try {
      const { query } = req;
      const { id: userId } = req.user;

      const response = await services.Notices.getMy({ query, userId });

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  static async changeFavourite(req, res, next) {
    try {
      const { id: noticeId } = req.params;
      const { id: userId } = req.user;

      await services.Notices.changeFavourite({ noticeId, userId });

      res.send();
    } catch (error) {
      next(error);
    }
  }
  static async getFavourite(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { query } = req;

      const response = await services.Notices.getFavourite({ query, userId });

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Notice;
