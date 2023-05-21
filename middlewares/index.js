const Authorization = require('./authorization.middleware');
const bodyValidation = require('./bodyValidation.middleware');
const paginationValidate = require('./paginationValidate.middleware');

const middlewares = { Authorization, bodyValidation, paginationValidate };
module.exports = middlewares;
