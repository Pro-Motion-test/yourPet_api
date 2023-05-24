const Authorization = require('./authorization.middleware');
const bodyValidation = require('./bodyValidation.middleware');
const paginationValidate = require('./paginationValidate.middleware');
const Server = require('./server.middleware');
const upload = require('./upload.middleware');
const middlewares = {
  Authorization,
  upload,
  Server,
  bodyValidation,
  paginationValidate,
};
module.exports = middlewares;
