const { providers } = require('../providers');

class News {
  constructor() {}
  async getNews({ search, skip, limit }) {
    try {
      const news = await providers.News.getAllNews({
        search,
        skip,
        limit,
      });

      const totalPages = await providers.News.getTotalPages({
        search,
        limit,
      });

      return { news, totalPages };
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new News();
