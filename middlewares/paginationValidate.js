const Joi = require('joi');
const {
  requestConstants: { defParams },
} = require('../constants');
const { HttpException } = require('../helpers');

const pagSchema = Joi.object({
  page: Joi.number().positive(),
  limit: Joi.number().positive(),
});

const paginationValidate = (req, res, next) => {
  try {
    const { page = defParams.page, limit = defParams.limit } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    console.log('pagination');

    const { error } = pagSchema.validate({ page: pageNum, limit: limitNum });

    if (error) {
      throw HttpException.BAD_REQUEST(error.message);
    }

    req.query.page = pageNum;
    req.query.limit = limitNum;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = paginationValidate;
