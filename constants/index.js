const {
  HTTP_STATUS_MESSAGES,
  HTTP_STATUS_CODES,
  HTTP_STATUS,
} = require('./errorHandler.constants');
const {
  SUCCESS_DELETE_RESPONSE,
  SUCCESS_POST_RESPONSE,
  SUCCESS_GET_RESPONSE,
  SUCCESS_PUT_RESPONSE,
} = require('./responseTemplate.constants');
const responseTemplates = {
  SUCCESS_DELETE_RESPONSE,
  SUCCESS_POST_RESPONSE,
  SUCCESS_GET_RESPONSE,
  SUCCESS_PUT_RESPONSE,
};
const errorHandlerConstants = {
  HTTP_STATUS_MESSAGES,
  HTTP_STATUS_CODES,
  HTTP_STATUS,
};
module.exports = { errorHandlerConstants, responseTemplates };
