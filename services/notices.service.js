const { providers } = require('../providers');
const { HttpException, NoticeHelper } = require('../helpers');
const {
  requestConstants: { defParams },
} = require('../constants');

class Notices {
  constructor() {}

  async getAll({ query, userId }) {
    const {
      search = '',
      category = defParams.category,
      page,
      limit,
      gender,
      fromTheDate,
      toTheDate,
    } = query;

    const skip = (page - 1) * limit;

    const { notices, totalPages } = await providers.Notices.getAllNotices({
      skip,
      limit,
      category,
      search,
      userId,
      gender,
      fromTheDate,
      toTheDate,
    });

    const revercedNotices = notices.reverse();

    return { page, limit, totalPages, data: revercedNotices };
  }

  async getById({ noticeId, userId }) {
    const notice = await providers.Notices.getOneNotice({ noticeId, userId });

    if (notice.length === 0) {
      throw HttpException.NOT_FOUND('Cannot find notice with this id');
    }

    return notice[0];
  }

  async createNotice({ body, owner, imgUrl }) {
    NoticeHelper.checkCategory(body);

    await providers.Notices.createNew({
      ...body,
      owner,
      imgUrl,
    });
  }

  async removeNotice({ noticeId, userId }) {
    const notice = await providers.Notices.getOneNotice({ noticeId, userId });

    if (notice.length === 0) {
      throw HttpException.NOT_FOUND('Cannot find notice with this id');
    }

    if (!notice[0].isOwner) {
      throw HttpException.BAD_REQUEST(
        `You cannot delete this notice, because it's not yours!`
      );
    }

    await providers.Notices.deleteNotice(noticeId);
  }

  async getMy({ query, userId }) {
    const { page, limit, search = '', gender, fromTheDate, toTheDate } = query;

    const skip = (page - 1) * limit;

    const { notices, totalPages } = await providers.Notices.getMyNotices({
      userId,
      skip,
      limit,
      search,
      gender,
      fromTheDate,
      toTheDate,
    });

    const revercedNotices = notices.reverse();

    return { page, limit, totalPages, data: revercedNotices };
  }

  async changeFavourite({ noticeId, userId }) {
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
  }

  async getFavourite({ query, userId }) {
    const { page, limit, search = '', gender, fromTheDate, toTheDate } = query;

    const skip = (page - 1) * limit;

    const { notices, totalPages } = await providers.Notices.getLikedNotices({
      skip,
      limit,
      userId,
      search,
      gender,
      fromTheDate,
      toTheDate,
    });

    const revercedNotices = notices.reverse();

    return { page, limit, totalPages, data: revercedNotices };
  }
}

module.exports = new Notices();
