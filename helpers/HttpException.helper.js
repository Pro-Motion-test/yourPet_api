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
  // Client error resps
  static BAD_REQUEST(message) {
    return new this(
      HTTP_STATUS_CODES.BAD_REQUEST,
      HTTP_STATUS_MESSAGES.BAD_REQUEST,
      { contextFn: this.BAD_REQUEST, message }
    );
  }
  static UNAUTHORIZED(message) {
    return new this(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      HTTP_STATUS_MESSAGES.UNAUTHORIZED,
      { contextFn: this.UNAUTHORIZED, message }
    );
  }
  static FORBIDDEN(message) {
    return new this(
      HTTP_STATUS_CODES.FORBIDDEN,
      HTTP_STATUS_MESSAGES.FORBIDDEN,
      { contextFn: this.FORBIDDEN, message }
    );
  }
  static NOT_FOUND(message) {
    return new this(
      HTTP_STATUS_CODES.NOT_FOUND,
      HTTP_STATUS_MESSAGES.NOT_FOUND,
      { contextFn: this.NOT_FOUND, message }
    );
  }
  static CONFLICT(message) {
    return new this(HTTP_STATUS_CODES.CONFLICT, HTTP_STATUS_MESSAGES.CONFLICT, {
      contextFn: this.CONFLICT,
      message,
    });
  }
  static PAYLOAD_TO_LARGE(message) {
    return new this(
      HTTP_STATUS_CODES.PAYLOAD_TO_LARGE,
      HTTP_STATUS_MESSAGES.PAYLOAD_TO_LARGE,
      { contextFn: this.PAYLOAD_TO_LARGE, message }
    );
  }
  static UNSUPPORTED_MEDIA_TYPE(message) {
    return new this(
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE,
      HTTP_STATUS_MESSAGES.UNSUPPORTED_MEDIA_TYPE,
      { contextFn: this.UNSUPPORTED_MEDIA_TYPE, message }
    );
  }
  static UPGRADE_REQUIRED(message) {
    return new this(
      HTTP_STATUS_CODES.UPGRADE_REQUIRED,
      HTTP_STATUS_MESSAGES.UPGRADE_REQUIRED,
      { contextFn: this.UPGRADE_REQUIRED, message }
    );
  }

  // Server error resps
  static INTERNAL_SERVER_ERROR(message) {
    return new this(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      { contextFn: this.INTERNAL_SERVER_ERROR, message }
    );
  }
  static SERVICE_ARE_UNAVAILABLE(message) {
    return new this(
      HTTP_STATUS_CODES.SERVICE_ARE_UNAVAILABLE,
      HTTP_STATUS_MESSAGES.SERVICE_ARE_UNAVAILABLE,
      { contextFn: this.SERVICE_ARE_UNAVAILABLE, message }
    );
  }
}
module.exports = HttpException;
