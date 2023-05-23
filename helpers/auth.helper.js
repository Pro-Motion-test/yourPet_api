const HttpException = require('./HttpException.helper');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, ACCESS_SECRET, REFRESH_SECRET } = require('../config');

class Auth {
  #TOKEN_SECRET;
  #ACCESS_SECRET;
  #REFRESH_SECRET;
  #tokenLifetime;
  #accessTokenLifetime;
  #refreshTokenLifetime;
  constructor({
    TOKEN_SECRET,
    ACCESS_SECRET,
    REFRESH_SECRET,
    tokenLifetime,
    accessTokenLifetime,
    refreshTokenLifetime,
  }) {
    this.#TOKEN_SECRET = TOKEN_SECRET;
    this.#ACCESS_SECRET = ACCESS_SECRET;
    this.#REFRESH_SECRET = REFRESH_SECRET;
    this.#tokenLifetime = tokenLifetime || '2d';
    this.#refreshTokenLifetime = refreshTokenLifetime || '61d';
    this.#accessTokenLifetime = accessTokenLifetime || '15m';
  }
  async verifyToken({ tokenType = 'token', token }) {
    let SECRET_BY_OPTION = '';
    switch (tokenType) {
      case 'access':
        SECRET_BY_OPTION = this.#ACCESS_SECRET;
        break;
      case 'refresh':
        SECRET_BY_OPTION = this.#REFRESH_SECRET;
        break;
      case 'token':
        SECRET_BY_OPTION = this.#TOKEN_SECRET;
        break;
      default:
        throw new Error('Invalid token type');
    }
    console.log(token);
    const resultOfVerifying = jwt.verify(token, SECRET_BY_OPTION);
    return resultOfVerifying;
  }
  async createToken({ id, email }) {
    const payload = { id, email };
    console.log('tokenSecret', this.#TOKEN_SECRET);
    const newToken = new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.#TOKEN_SECRET,
        { expiresIn: this.#tokenLifetime },
        (err, encoded) => {
          err || !encoded
            ? reject(
                err ||
                  new Error(
                    `Token creation have been failed! Payload: ${payload}`
                  )
              )
            : resolve(encoded);
        }
      );
    });
    return newToken;
  }
  async createAccessToken({ id, email }) {
    const payload = { id, email };
    const newAccessToken = new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.#ACCESS_SECRET,
        { expiresIn: this.#accessTokenLifetime },
        (err, encoded) => {
          err || !encoded
            ? // if creation error
              reject(
                err ||
                  new Error(
                    `Token creation have been failed. Payload: ${payload}`
                  )
              ) // all is good
            : resolve(encoded);
        }
      );
    });
    return newAccessToken;
  }
  async createRefreshToken({ id, email }) {
    const payload = { id, email };
    const newRefreshToken = new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.#REFRESH_SECRET,
        { expiresIn: this.#refreshTokenLifetime },
        (err, encoded) => {
          err || !encoded
            ? // if creation error
              reject(
                err ||
                  new Error(
                    `Token creation have been failed! Payload: ${payload}`
                  )
              ) // all is good
            : resolve(encoded);
        }
      );
    });
    return newRefreshToken;
  }
  async decodeToken(token) {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  }

  async getTokenWithHeader(headers) {
    const headerWithToken = headers.Authorization || headers.authorization;
    if (!headerWithToken) {
      throw HttpException.BAD_REQUEST(
        'Bad Request, authorization header is required.'
      );
    }
    const [bearer, token] = headerWithToken.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw HttpException.BAD_REQUEST(
        'Bad request! Invalid payload in Authorization header'
      );
    }
    return token;
  }

  async validateToken({ tokenType, token }) {
    try {
      const data = await this.verifyToken({ tokenType, token });
      if (!data) {
        throw HttpException.UNAUTHORIZED();
      }

      return data;
    } catch (e) {
      if (tokenType === 'access' && e.message === 'jwt expired') {
        throw HttpException.FORBIDDEN(
          'EXPIRED! Access token have been expired! Please, use refresh token to continue.'
        );
      }
      console.error(e);
      throw HttpException.UNAUTHORIZED();
    }
  }
}

module.exports = new Auth({ TOKEN_SECRET, ACCESS_SECRET, REFRESH_SECRET });
