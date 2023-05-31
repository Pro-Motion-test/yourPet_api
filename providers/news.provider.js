const { Provider } = require('./super');

class News extends Provider {
  constructor(modelName = 'News') {
    super(modelName);
  }

  async getAllNews({ search = '', skip = 0, limit = 0 }) {
    const query = { title: { $regex: search, $options: 'i' } };

    return await this.model.find(query).skip(skip).limit(limit);
  }

  async getTotalPages({ search = '', limit = 0 }) {
    const query = { title: { $regex: search, $options: 'i' } };
    const count = await this.model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return totalPages;
  }
}
module.exports = new News();
