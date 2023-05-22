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
      const { id: userId } = req.user;

      const skip = (page - 1) * limit;

      const notices = await providers.Notices.getAllNotices({
        skip,
        limit,
        category,
        search,
        userId,
      });

      const totalPages = await providers.Notices.getTotalPages({
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
      const { id: userId } = req.user;

      const notice = await providers.Notices.getOneNotice({ noticeId, userId });

      if (notice.length === 0) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      res.json(...notice);
    } catch (error) {
      next(error);
    }
  }
  static async createNotice(req, res, next) {
    try {
      NoticeHelper.checkCategory(req.body);

      await providers.Notices.createNew({
        ...req.body,
        owner: req.user.id,
        imgUrl:
          'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg',
      });

      res.status(201).json({ message: 'Created' });
    } catch (error) {
      next(error);
    }
  }
  static async removeNotice(req, res, next) {
    try {
      const { id: noticeId } = req.params;
      const { id: userId } = req.user;

      const notice = await providers.Notices.getOneNotice({ noticeId, userId });

      console.log(notice);

      if (notice.length === 0) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      if (!notice[0].isOwner) {
        throw HttpException.FORBIDDEN(
          `You cannot delete this notice, because it's not yours!`
        );
      }

      await providers.Notices.deleteNotice(noticeId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  static async getMy(req, res, next) {
    try {
      const { page, limit, search = '' } = req.query;
      const { id: userId } = req.user;
      const skip = (page - 1) * limit;

      const totalPages = await providers.Notices.getTotalPagesForMyNotices({
        userId,
        limit,
        search,
      });

      const notices = await providers.Notices.getMyNotices({
        userId,
        skip,
        limit,
        search,
      });

      res.json({ page, limit, totalPages, data: notices });
    } catch (error) {
      next(error);
    }
  }
  static async changeFavourite(req, res, next) {
    try {
      const { id: noticeId } = req.params;
      const { id: userId } = req.user;

      const notice = await providers.Notices.getOneNotice({ noticeId, userId });

      if (notice.length === 0) {
        throw HttpException.NOT_FOUND('Cannot find notice with this id');
      }

      const isLiked = await providers.Notices.getOneLikedNotice({
        noticeId,
        userId,
      });

      if (isLiked) {
        await providers.Notices.dislike({ noticeId, userId });
      } else {
        await providers.Notices.like({ noticeId, userId });
      }

      res.json({ message: 'Ok' });
    } catch (error) {
      next(error);
    }
  }
  static async getFavourite(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { page, limit, search = '' } = req.query;

      const skip = (page - 1) * limit;

      const totalPages = await providers.Notices.getTotalPagesForLikedNotices({
        limit,
        userId,
        search,
      });

      const likedNotices = await providers.Notices.getLikedNotices({
        skip,
        limit,
        userId,
        search,
      });

      res.json({ page, limit, totalPages, data: likedNotices });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Notice;
