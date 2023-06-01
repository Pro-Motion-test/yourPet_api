const { providers } = require('../providers');

class News {
  constructor() {}
  async getNews({ search, skip, limit }) {
    try {
      const { news, totalPages } = await providers.News.getAllNews({
        search,
        skip,
        limit,
      });

      return { news, totalPages };
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new News();
