const { Provider } = require('./super');

class News extends Provider {
  constructor(modelName = 'News') {
    super(modelName);
  }

  async getAllNews({ search = '', skip = 0, limit = 0 }) {
    const query = { title: { $regex: search, $options: 'i' } };
    const news = await this.model.find(query).skip(skip).limit(limit);
    const count = await this.model.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return { news, totalPages };
  }
}

module.exports = new News();
