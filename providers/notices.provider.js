const { Provider } = require('./super');

class Notices extends Provider {
  constructor(modelName = 'Notice') {
    super(modelName);
  }
  async getAllNotices({ skip, limit, category, search }) {
    return await this.model.find(
      { category, title: { $regex: search, $options: 'i' } },
      '',
      {
        skip,
        limit,
      }
    );
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
  async getOneNotice(notId) {
    return await this.model.findById(notId);
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