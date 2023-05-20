const { providers } = require('../providers');
const { HttpException } = require('../helpers');

class Notice {
  constructor() {}
  static async getAll(req, res, next) {
    try {
      const { search, category, page = '1', limit = '12' } = req.query;
      const { filter } = req.body;

      const skip = (page - 1) * limit;

      const totalPages = await providers.NoticesProvider.getTotalPages({
        limit,
        category,
      });

      const notices = await providers.NoticesProvider.getAllNotices({
        skip,
        limit,
        category,
      });

      res.json({ page, limit, totalPages, data: notices });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { notId } = req.params;

      const notice = await providers.NoticesProvider.getOneNotice(notId);

      if (!notice) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      res.json(notice);
    } catch (error) {
      next(error);
    }
  }
  static async createNotice(req, res, next) {
    try {
      await providers.NoticesProvider.createNew({
        ...req.body,
        owner: req.user.id,
        imgUrl: 'Заглушка',
      });

      res.status(201).json({ message: 'Created' });
    } catch (error) {
      next(error);
    }
  }
  static async removeNotice(req, res, next) {
    try {
      const { notId } = req.params;

      if (!(await providers.NoticesProvider.getOneNotice(notId))) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      await providers.NoticesProvider.deleteNotice(notId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  static async getMy(req, res, next) {
    try {
      const { search, category, page = '1', limit = '12' } = req.query;
      const { filter } = req.body;
      const skip = (page - 1) * limit;

      const totalPages = providers.NoticesProvider.getTotalPages({
        limit,
        category,
      });

      const notices = await providers.NoticesProvider.getMyNotices({
        owner: req.user.id,
        skip,
        limit,
      });

      res.json({ page, limit, totalPages, data: notices });
    } catch (error) {
      next(error);
    }
  }
  static async changeFavourite(req, res, next) {
    try {
    } catch (error) {
      next();
    }
  }
  static async getFavourite(req, res, next) {
    try {
    } catch (error) {
      next();
    }
  }
}
module.exports = Notice;
