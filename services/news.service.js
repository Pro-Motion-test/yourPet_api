const { providers } = require('../providers');

class News {
  constructor() {}
  async getNews({ search, skip, limit }) {
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
  }
}

module.exports = new News();
