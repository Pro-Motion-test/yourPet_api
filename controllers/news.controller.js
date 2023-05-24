const { responseTemplates } = require('../constants');
const services = require('../services');

class News {
  constructor() {}
  static async getAllNews(req, res, next) {
    try {
      const { search = '', page, limit } = req.query;

      const skip = (page - 1) * limit;

      const { news, totalPages } = await services.News.getNews({
        skip,
        limit,
        search,
      });

      res.status(200).json({
        response: {
          ...responseTemplates.SUCCESS_GET_RESPONSE,
          message: 'Successfully processed',
        },
        body: { page, limit, totalPages, data: news },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = News;
