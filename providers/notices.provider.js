const { Provider } = require('./super');
const { models } = require('../models');
const mongoose = require('mongoose');

class Notices extends Provider {
  constructor(modelName = 'Notice') {
    super(modelName);
  }
  async getAllNotices({ skip, limit, category, search, userId }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;

    return await this.model.aggregate([
      { $match: { category, title: { $regex: search, $options: 'i' } } },
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
          isLiked: 1,
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
  async getMyNotices({ skip, limit, userId, search }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;

    return await this.model.aggregate([
      {
        $match: {
          owner: userObjectId,
          title: { $regex: search, $options: 'i' },
        },
      },
      {
        $project: { name: 0, breed: 0, comments: 0, price: 0, owner: 0 },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
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
  async getLikedNotices({ skip, limit, userId, search }) {
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;

    return await this.model.aggregate([
      {
        $match: {
          likedByUsers: userObjectId,
          title: { $regex: search, $options: 'i' },
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
        },
      },
      { $project: { owner: 0 } },
    ]);
  }
  async getTotalPages({ limit, category, search }) {
    return Math.ceil(
      (
        await this.model.find({
          category,
          title: { $regex: search, $options: 'i' },
        })
      ).length / limit
    );
  }
  async getTotalPagesForMyNotices({ limit, userId, search }) {
    return Math.ceil(
      (
        await this.model.find({
          owner: userId,
          title: { $regex: search, $options: 'i' },
        })
      ).length / limit
    );
  }
  async getTotalPagesForLikedNotices({ limit, userId, search }) {
    return Math.ceil(
      (
        await this.model.find({
          likedByUsers: userId,
          title: { $regex: search, $options: 'i' },
        })
      ).length / limit
    );
  }
}
module.exports = new Notices('Notice');
