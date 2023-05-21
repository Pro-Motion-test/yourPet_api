const { HttpException } = require('../helpers');

const bodyValidation = schema => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpException.BAD_REQUEST(error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = bodyValidation;
