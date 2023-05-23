const { services } = require('../services');

class News {
  constructor() {}
  static async getAllNews(req, res, next) {
    try {
      const { search = '', page, limit } = req.query;

      const skip = (page - 1) * limit;

      const news  = await services.News.getNews({
        skip,
        limit,
        search,
      });

      res.json({ page, limit, data: news });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = News;
