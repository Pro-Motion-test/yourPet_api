require('dotenv').config();
const {
  PORT,
  BASE_URL,
  DB_URI,
  SENDGRID_API_KEY,
  TOKEN_SECRET,
  ACCESS_SECRET,
  REFRESH_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  IS_MAINTENANCE_MODE,
  refreshTokenLifetime,
  accessTokenLifetime,
} = process.env;
class Config {
  constructor({
    PORT,
    BASE_URL,
    DB_URI,
    SENDGRID_API_KEY,
    TOKEN_SECRET,
    ACCESS_SECRET,
    REFRESH_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET,
    IS_MAINTENANCE_MODE,
    refreshTokenLifetime,
    accessTokenLifetime,
  }) {
    (this.PORT = PORT || 8090),
      (this.BASE_URL = BASE_URL || `http://localhost:${this.PORT}`),
      (this.DB_URI = DB_URI),
      (this.SENDGRID_API_KEY = SENDGRID_API_KEY),
      (this.TOKEN_SECRET = TOKEN_SECRET);
    this.ACCESS_SECRET = ACCESS_SECRET;
    this.REFRESH_SECRET = REFRESH_SECRET;
    this.CLOUDINARY_API_KEY = CLOUDINARY_API_KEY;
    this.CLOUDINARY_SECRET = CLOUDINARY_SECRET;
    this.IS_MAINTENANCE_MODE = IS_MAINTENANCE_MODE === 'false' ? false : true;
    (this.refreshTokenLifetime = refreshTokenLifetime || '60d'),
      (this.accessTokenLifetime = accessTokenLifetime) || '15m';
  }
}
module.exports = new Config({
  PORT,
  BASE_URL,
  DB_URI,
  SENDGRID_API_KEY,
  TOKEN_SECRET,
  ACCESS_SECRET,
  REFRESH_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  IS_MAINTENANCE_MODE,
  refreshTokenLifetime,
  accessTokenLifetime,
});
