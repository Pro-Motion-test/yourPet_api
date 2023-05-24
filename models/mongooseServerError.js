const mongooseServerError = (err, data, next) => {
  const { name, code } = err;
  const status = name === 'MongooseServerError' && code === 11000 ? 409 : 400;
  err.status = HTTP_STATUS_CODES;
  return next(err);
};
module.exports = mongooseServerError;
