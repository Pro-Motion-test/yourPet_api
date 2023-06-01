const { Provider } = require('./super');
const mongoose = require('mongoose');
const {
  requestConstants: { validation },
} = require('../constants');
const NoticeHelper = require('../helpers/notice.helper');

class Notices extends Provider {
  constructor(modelName = 'Notice') {
    super(modelName);
  }
  async getAllNotices({
    skip,
    limit,
    category,
    search,
    gender,
    userId,
    fromTheDate,
    toTheDate,
  }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;
    const startDate = NoticeHelper.isDate(fromTheDate)
      ? new Date(fromTheDate)
      : new Date('1800-01-01');
    const endDate = NoticeHelper.isDate(toTheDate)
      ? new Date(toTheDate)
      : new Date();

    const query = {
      category,
      title: { $regex: search, $options: 'i' },
      sex: [validation.sexValues.MALE, validation.sexValues.FEMALE].includes(
        gender
      )
        ? gender
        : { $exists: true },
      $or: [
        startDate > endDate
          ? {
              $or: [
                {
                  date: {
                    $gt: startDate,
                  },
                },
                {
                  date: {
                    $lt: endDate,
                  },
                },
              ],
            }
          : {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
            },
      ],
    };

    const projection = {
      name: 0,
      breed: 0,
      comments: 0,
      price: 0,
      owner: 0,
      likedByUsers: 0,
    };

    const notices = await this.model.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          isOwner: {
            $cond: [{ $eq: ['$owner', userObjectId] }, true, false],
          },
          isFavourite: {
            $cond: [{ $in: [userObjectId, '$likedByUsers'] }, true, false],
          },
        },
      },
      { $project: projection },
    ]);

    const count = await this.model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return { notices, totalPages };
  }
  async getOneNotice({ noticeId, userId }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;
    const query = { _id: new mongoose.Types.ObjectId(noticeId) };
    const projection = {
      title: 1,
      name: 1,
      category: 1,
      breed: 1,
      sex: 1,
      location: 1,
      date: 1,
      imgUrl: 1,
      price: 1,
      comments: 1,
      isOwner: 1,
      isFavourite: 1,
      'user.phone': 1,
      'user.email': 1,
    };

    return await this.model.aggregate([
      { $match: query },
      {
        $addFields: {
          isOwner: {
            $cond: [{ $eq: ['$owner', userObjectId] }, true, false],
          },
          isFavourite: {
            $cond: [{ $in: [userObjectId, '$likedByUsers'] }, true, false],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: projection,
      },
    ]);
  }
  async createNew(data) {
    return await this.model.create(data);
  }
  async deleteNotice(id) {
    return await this.model.findByIdAndDelete(id);
  }
  async getMyNotices({
    skip,
    limit,
    userId,
    search,
    gender,
    fromTheDate,
    toTheDate,
  }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;
    const startDate = NoticeHelper.isDate(fromTheDate)
      ? new Date(fromTheDate)
      : new Date('1800-01-01');
    const endDate = NoticeHelper.isDate(toTheDate)
      ? new Date(toTheDate)
      : new Date();

    const query = {
      owner: userObjectId,
      title: { $regex: search, $options: 'i' },
      sex: [validation.sexValues.MALE, validation.sexValues.FEMALE].includes(
        gender
      )
        ? gender
        : { $exists: true },
      $or: [
        startDate > endDate
          ? {
              $or: [
                {
                  date: {
                    $gt: startDate,
                  },
                },
                {
                  date: {
                    $lt: endDate,
                  },
                },
              ],
            }
          : {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
            },
      ],
    };
    const projection = {
      name: 0,
      breed: 0,
      comments: 0,
      price: 0,
      owner: 0,
      likedByUsers: 0,
    };

    const notices = await this.model.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          isOwner: true,
          isFavourite: {
            $cond: [{ $in: [userObjectId, '$likedByUsers'] }, true, false],
          },
        },
      },
      { $project: projection },
    ]);

    const count = await this.model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return { notices, totalPages };
  }
  async like({ noticeId, userId }) {
    return await this.model.findByIdAndUpdate(
      noticeId,
      { $push: { likedByUsers: userId } },
      { new: true }
    );
  }
  async dislike({ noticeId, userId }) {
    return await this.model.findByIdAndUpdate(
      noticeId,
      { $pull: { likedByUsers: userId } },
      { new: true }
    );
  }
  async getOneLikedNotice({ noticeId, userId }) {
    return await this.model.findOne({ _id: noticeId, likedByUsers: userId });
  }
  async getLikedNotices({
    skip,
    limit,
    userId,
    search,
    gender,
    fromTheDate,
    toTheDate,
  }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;
    const startDate = NoticeHelper.isDate(fromTheDate)
      ? new Date(fromTheDate)
      : new Date('1800-01-01');
    const endDate = NoticeHelper.isDate(toTheDate)
      ? new Date(toTheDate)
      : new Date();

    const query = {
      likedByUsers: userObjectId,
      title: { $regex: search, $options: 'i' },
      sex: [validation.sexValues.MALE, validation.sexValues.FEMALE].includes(
        gender
      )
        ? gender
        : { $exists: true },
      $or: [
        startDate > endDate
          ? {
              $or: [
                {
                  date: {
                    $gt: startDate,
                  },
                },
                {
                  date: {
                    $lt: endDate,
                  },
                },
              ],
            }
          : {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
            },
      ],
    };
    const projection = {
      name: 0,
      breed: 0,
      comments: 0,
      price: 0,
      likedByUsers: 0,
      owner: 0,
    };

    const notices = await this.model.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          isOwner: {
            $cond: [{ $eq: ['$owner', userObjectId] }, true, false],
          },
          isFavourite: true,
        },
      },
      {
        $project: projection,
      },
    ]);

    const count = await this.model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return { notices, totalPages };
  }
}
module.exports = new Notices('Notice');
