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

    return await this.model.aggregate([
      {
        $match: {
          category,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        },
      },
      { $project: { name: 0, breed: 0, comments: 0, price: 0 } },
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
      { $project: { owner: 0, likedByUsers: 0 } },
    ]);
  }
  async getOneNotice({ noticeId, userId }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;

    return await this.model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(noticeId) } },
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
        $project: {
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
        },
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

    return await this.model.aggregate([
      {
        $match: {
          owner: userObjectId,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        },
      },
      {
        $project: { name: 0, breed: 0, comments: 0, price: 0, owner: 0 },
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
      { $project: { likedByUsers: 0 } },
    ]);
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

    return await this.model.aggregate([
      {
        $match: {
          likedByUsers: userObjectId,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        },
      },
      {
        $project: { name: 0, breed: 0, comments: 0, price: 0, likedByUsers: 0 },
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
      { $project: { owner: 0 } },
    ]);
  }
  async getTotalPages({
    limit,
    category,
    search,
    gender,
    fromTheDate,
    toTheDate,
  }) {
    return Math.ceil(
      (
        await this.model.find({
          category,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        })
      ).length / limit
    );
  }
  async getTotalPagesForMyNotices({
    limit,
    userId,
    search,
    gender,
    fromTheDate,
    toTheDate,
  }) {
    return Math.ceil(
      (
        await this.model.find({
          owner: userId,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        })
      ).length / limit
    );
  }
  async getTotalPagesForLikedNotices({
    limit,
    userId,
    search,
    gender,
    fromTheDate,
    toTheDate,
  }) {
    return Math.ceil(
      (
        await this.model.find({
          likedByUsers: userId,
          title: { $regex: search, $options: 'i' },
          sex:
            gender === validation.sexValues.MALE ||
            gender === validation.sexValues.FEMALE
              ? gender
              : { $exists: true },
          date: {
            $gte: NoticeHelper.isDate(fromTheDate)
              ? new Date(fromTheDate)
              : new Date('1800-01-01'),
            $lte: NoticeHelper.isDate(toTheDate)
              ? new Date(toTheDate)
              : new Date(),
          },
        })
      ).length / limit
    );
  }
}
module.exports = new Notices('Notice');
