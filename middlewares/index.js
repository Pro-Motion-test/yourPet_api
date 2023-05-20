const Authorization = require('./authorization.middleware');
const bodyValidation = require('./bodyValidation');
const paginationValidate = require('./paginationValidate');

const middlewares = { Authorization, bodyValidation, paginationValidate };
module.exports = middlewares;
