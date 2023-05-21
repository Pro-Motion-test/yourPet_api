const { Provider } = require('./super');
const { models } = require('../models');
const mongoose = require('mongoose');

class Notices extends Provider {
  constructor(modelName = 'Notice') {
    super(modelName);
  }
  async getAllNotices({ skip, limit, category, search }) {
    const { _id } = await models.User.findById('6469b5679228478140b035e8');

    return await this.model.aggregate([
      { $match: { category, title: { $regex: search, $options: 'i' } } },
      { $project: { name: 0, breed: 0, comments: 0, price: 0 } },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          isOwner: {
            $cond: [{ $eq: ['$owner', _id] }, true, false],
          },
          isLiked: {
            $cond: [{ $in: [_id, '$likedByUsers'] }, true, false],
          },
        },
      },
      { $project: { owner: 0, likedByUsers: 0 } },
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
  async getOneNotice({ noticeId }) {
    const { _id } = await models.User.findById('6469b5679228478140b035e8');

    return await this.model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(noticeId) } },
      {
        $addFields: {
          isOwner: {
            $cond: [{ $eq: ['$owner', _id] }, true, false],
          },
          isLiked: {
            $cond: [{ $in: [_id, '$likedByUsers'] }, true, false],
          },
        },
      },
      { $project: { owner: 0, likedByUsers: 0 } },
    ]);
  }
  async createNew(data) {
    return await this.model.create(data);
  }
  async deleteNotice(notId) {
    return await this.model.findByIdAndDelete(notId);
  }
  async getMyNotices({ owner, skip, limit }) {
    return await this.model.find({ owner }).skip(skip).limit(limit);
  }
  async getTotalPagesForMyNotices({ limit, owner }) {
    return Math.ceil((await this.model.find({ owner })).length / limit);
  }
  async like({ notId, userId }) {
    return await this.model.findByIdAndUpdate(
      notId,
      { $push: { likedByUsers: userId } },
      { new: true }
    );
  }
  async dislike({ notId, userId }) {
    return await this.model.findByIdAndUpdate(
      notId,
      { $pull: { likedByUsers: userId } },
      { new: true }
    );
  }
  async getOneLikedNotice({ notId, userId }) {
    return await this.model.findOne({ _id: notId, likedByUsers: userId });
  }
  async getLikedNotices({ skip, limit, userId }) {
    return await this.model
      .find({ likedByUsers: userId })
      .skip(skip)
      .limit(limit);
  }
  async getTotalPagesForLikedNotices({ limit, userId }) {
    return Math.ceil(
      (await this.model.find({ likedByUsers: userId })).length / limit
    );
  }
}
module.exports = new Notices('Notice');
