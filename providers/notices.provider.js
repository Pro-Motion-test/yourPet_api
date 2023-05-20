const { Provider } = require('./super');

class Notices extends Provider {
  constructor(modelName = 'Notice') {
    super(modelName);
  }
  async getAllNotices({ skip, limit, category }) {
    return await this.model.find({ category }, '', { skip, limit });
  }
  async getTotalPages({ limit, category }) {
    return Math.ceil(
      (await NoticeModel.Notice.find({ category })).length / limit
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
}
module.exports = new Notices('Notice');
