const HTTP_STATUS = Object.freeze({
  // Client error resps
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  PAYLOAD_TO_LARGE: 'PAYLOAD_TO_LARGE',
  UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',
  UPGRADE_REQUIRED: 'UPGRADE_REQUIRED',
  // Server error resps
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_ARE_UNAVAILABLE: 'SERVICE_ARE_UNAVAILABLE',
});
const HTTP_STATUS_CODES = Object.freeze({
  // Client error resps
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PAYLOAD_TO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UPGRADE_REQUIRED: 426,
  // Server error resps
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_ARE_UNAVAILABLE: 503,
});
const HTTP_STATUS_MESSAGES = Object.freeze({
  BAD_REQUEST: 'Failed! Bad request, invalid value',
  UNAUTHORIZED:
    'Failed! Unauthorized, you are not a user, please log in or create an account',
  FORBIDDEN: 'Failed! Forbidden, you are not allowed to access this resource',
  NOT_FOUND: 'Failed! Not found, there is nothing here  ¯/_(ツ)_/¯',
  CONFLICT: 'Failed! Conflict, something goes wrong ',
  PAYLOAD_TO_LARGE: 'Failed! Payload to large ',
  UNSUPPORTED_MEDIA_TYPE: 'Failed! Unsupported media type, please check it',
  UPGRADE_REQUIRED: 'Failed! Upgrade required, please upgrade firstly',
  // Server error resps
  INTERNAL_SERVER_ERROR:
    'Failed! Internal server error, you have no power to fix it ',
  SERVICE_ARE_UNAVAILABLE: 'Failed! Service are unavailable, please come later',
});
module.exports = { HTTP_STATUS_MESSAGES, HTTP_STATUS_CODES, HTTP_STATUS };
