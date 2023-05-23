const Authorization = require('./authorization.middleware');
const bodyValidation = require('./bodyValidation.middleware');
const paginationValidate = require('./paginationValidate.middleware');
const upload = require('./upload.middleware');
const middlewares = {
  Authorization,
  upload,
  bodyValidation,
  paginationValidate,
};
module.exports = middlewares;
