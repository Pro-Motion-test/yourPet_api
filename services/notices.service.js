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
    } = query;

    const skip = (page - 1) * limit;

    const notices = await providers.Notices.getAllNotices({
      skip,
      limit,
      category,
      search,
      userId,
      gender,
      fromTheDate,
    });

    const totalPages = await providers.Notices.getTotalPages({
      limit,
      category,
      search,
      gender,
      fromTheDate,
    });

    return { page, limit, totalPages, data: notices };
  }

  async getById({ noticeId, userId }) {
    const notice = await providers.Notices.getOneNotice({ noticeId, userId });

    if (notice.length === 0) {
      throw HttpException.NOT_FOUND('Cannot find notice with this id');
    }

    return notice[0];
  }

  async createNotice({ body, owner }) {
    NoticeHelper.checkCategory(body);

    await providers.Notices.createNew({
      ...body,
      owner,
      imgUrl:
        'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg',
    });
  }

  async removeNotice({ noticeId, userId }) {
    const notice = await providers.Notices.getOneNotice({ noticeId, userId });

    if (notice.length === 0) {
      throw HttpException.NOT_FOUND('Cannot find notice with this id');
    }

    if (!notice[0].isOwner) {
      throw HttpException.FORBIDDEN(
        `You cannot delete this notice, because it's not yours!`
      );
    }

    await providers.Notices.deleteNotice(noticeId);
  }

  async getMy({ query, userId }) {
    const { page, limit, search = '', gender, fromTheDate } = query;

    const skip = (page - 1) * limit;

    const notices = await providers.Notices.getMyNotices({
      userId,
      skip,
      limit,
      search,
      gender,
      fromTheDate,
    });

    console.log(notices);

    const totalPages = await providers.Notices.getTotalPagesForMyNotices({
      userId,
      limit,
      search,
      gender,
      fromTheDate,
    });

    return { page, limit, totalPages, data: notices };
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
    const { page, limit, search = '', gender, fromTheDate } = query;

    const skip = (page - 1) * limit;

    const totalPages = await providers.Notices.getTotalPagesForLikedNotices({
      limit,
      userId,
      search,
      gender,
      fromTheDate,
    });

    const notices = await providers.Notices.getLikedNotices({
      skip,
      limit,
      userId,
      search,
      gender,
      fromTheDate,
    });

    return { page, limit, totalPages, data: notices };
  }
}

module.exports = new Notices();
