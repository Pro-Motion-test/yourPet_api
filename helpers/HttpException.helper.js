const {
  HTTP_STATUS,
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGES,
} = require('../constants/errorHandler.constants');

class HttpException extends Error {
  constructor(
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
    status = HTTP_STATUS.BAD_REQUEST,
    payload
  ) {
    super();
    const { message, contextFn = this.constructor } = payload;
    this.name = 'Http Exception';
    this.status = status;
    this.statusCode = statusCode;
    this.message = message || status;
    Error.captureStackTrace(this, contextFn);
  }
  static BAD_REQUEST(message) {
    return new this(
      HTTP_STATUS_CODES.BAD_REQUEST,
      HTTP_STATUS_MESSAGES.BAD_REQUEST,
      { contextFn: this.BAD_REQUEST, message }
    );
  }
}
module.exports = HttpException;
