const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');
class JWT {
  #TOKEN_SECRET;
  constructor({
    TOKEN_SECRET,
    times: { tokenExpiredAt, accessTokenLifetime, refreshTokenLifetime },
  }) {
    this.#TOKEN_SECRET = TOKEN_SECRET;
    this.tokenExpiredAt = tokenExpiredAt || '2d';
    this.refreshTokenLifetime = refreshTokenLifetime || '61d';
    this.accessTokenLifetime = accessTokenLifetime || '30m';
  }
  async createToken({ id, email }) {
    const payload = { id, email };
    const newToken = jwt.sign(payload, this.#TOKEN_SECRET);
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
}

module.exports = new JWT({ TOKEN_SECRET });
