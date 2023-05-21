const { providers } = require('../providers');
const { HttpException, NoticeHelper } = require('../helpers');
const {
  requestConstants: { defParams },
} = require('../constants');

class Notice {
  constructor() {}
  static async getAll(req, res, next) {
    try {
      const {
        search = '',
        category = defParams.category,
        page,
        limit,
      } = req.query;

      const skip = (page - 1) * limit;

      const totalPages = await providers.Notices.getTotalPages({
        limit,
        category,
        search,
      });

      const notices = await providers.Notices.getAllNotices({
        skip,
        limit,
        category,
        search,
      });

      res.json({ page, limit, totalPages, data: notices });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id: noticeId } = req.params;

      const notice = await providers.Notices.getOneNotice({ noticeId });

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
      const { error } = NoticeHelper.checkCategory(req.body);

      if (error) {
        throw error;
      }

      await providers.Notices.createNew({
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

      const notice = await providers.Notices.getOneNotice(notId);

      if (!notice) {
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

      const totalPages = await providers.Notices.getTotalPagesForMyNotices({
        owner,
        limit,
      });

      console.log(totalPages);

      const notices = await providers.Notices.getMyNotices({
        owner,
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

      const notice = await providers.Notices.getOneNotice(notId);

      if (!notice) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      const isLiked = await providers.Notices.getOneLikedNotice({
        notId,
        userId,
      });

      if (isLiked) {
        await providers.Notices.dislike({ notId, userId });
      } else {
        await providers.Notices.like({ notId, userId });
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

      const totalPages = await providers.Notices.getTotalPagesForLikedNotices({
        limit,
        userId,
      });

      const likedNotices = await providers.Notices.getAllNotices({
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
