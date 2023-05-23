const { Provider } = require('./super');
// const mongoose = require('mongoose');

class News extends Provider {
  constructor(modelName = 'News') {
    super(modelName);
  }
  async getAllNews({ search, skip, limit }) {
    return await this.model
      .find({ title: { $regex: search, $options: 'i' } })
      .skip(skip)
      .limit(limit);
  }

  async getTotalPages({ limit, search }) {
    return Math.ceil(
      (
        await this.model.find({
          title: { $regex: search, $options: 'i' },
        })
      ).length / limit
    );
  }
}
module.exports = new News('News');
