const HttpException = require('./HttpException.helper');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

class Auth {
  #TOKEN_SECRET;
  constructor({
    TOKEN_SECRET,
    tokenLifetime,
    accessTokenLifetime,
    refreshTokenLifetime,
  }) {
    this.#TOKEN_SECRET = TOKEN_SECRET;
    this.tokenLifetime = tokenLifetime || '2d';
    this.refreshTokenLifetime = refreshTokenLifetime || '61d';
    this.accessTokenLifetime = accessTokenLifetime || '30m';
  }
  async createToken({ id, email }) {
    const payload = { id, email };
    console.log('tokenSecret', this.#TOKEN_SECRET);
    const newToken = new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.#TOKEN_SECRET,
        { expiresIn: this.tokenLifetime },
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
        this.#TOKEN_SECRET,
        { expiresIn: this.accessTokenLifetime },
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
        this.#TOKEN_SECRET,
        { expiresIn: this.refreshTokenLifetime },
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
  async verifyToken(token) {
    const resultOfVerifying = jwt.verify(token, this.#TOKEN_SECRET);

    return resultOfVerifying;
  }

  async validateToken(headerWithToken) {
    const [bearer, token] = headerWithToken.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw HttpException.BAD_REQUEST(
        'Bad request! Invalid payload in Authorization header'
      );
    }
    try {
      const data = await this.verifyToken(token);
      if (!data) {
        throw HttpException.UNAUTHORIZED();
      }

      return data;
    } catch (e) {
      throw HttpException.UNAUTHORIZED();
    }
  }
}

module.exports = new Auth({ TOKEN_SECRET });
