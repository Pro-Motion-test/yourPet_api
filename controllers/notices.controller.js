const { providers } = require('../providers');
const { HttpException, NoticeHelper } = require('../helpers');
const {
  requestConstants: { defParams },
} = require('../constants');

class Notice {
  constructor() {}
  static async getAll(req, res, next) {
    try {
      const { category = defParams.category, page, limit } = req.query;

      const skip = (page - 1) * limit;

      const totalPages = await providers.Notices.getTotalPages({
        limit,
        category,
      });

      const notices = await providers.Notices.getAllNotices({
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

      const notice = await providers.Notices.getOneNotice(notId);

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

      if (notice.owner.toString() !== req.user.id) {
        throw HttpException.FORBIDDEN(
          `You cannot delete this notice, because it's not yours!`
        );
      }

      await providers.Notices.deleteNotice(notId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  static async getMy(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { id: owner } = req.user;
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
      const { notId } = req.params;
      const { id: userId } = req.user;

      const notice = await providers.NoticesProvider.getOneNotice(notId);

      if (!notice) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      const isLiked = await providers.NoticesProvider.getOneLikedNotice({
        notId,
        userId,
      });

      if (isLiked) {
        await providers.NoticesProvider.dislike({ notId, userId });
      } else {
        await providers.NoticesProvider.like({ notId, userId });
      }

      res.json({ message: 'Ok' });
    } catch (error) {
      next(error);
    }
  }
  static async getFavourite(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { page, limit } = req.query;

      const skip = (page - 1) * limit;

      const totalPages =
        await providers.NoticesProvider.getTotalPagesForLikedNotices({
          limit,
          userId,
        });

      const likedNotices = await providers.NoticesProvider.getAllNotices({
        skip,
        limit,
        userId,
      });

      res.json({ page, limit, totalPages, data: likedNotices });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Notice;
