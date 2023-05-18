require('dotenv').config();
const { PORT, BASE_URL, DB_URI, SENDGRID_API_KEY, TOKEN_SECRET } = process.env;
class Config {
  constructor() {
    (this.PORT = PORT || 8090),
      (this.BASE_URL = BASE_URL || `http://localhost:${this.PORT}`),
      (this.DB_URI = DB_URI),
      (this.SENDGRID_API_KEY = SENDGRID_API_KEY),
      (this.TOKEN_SECRET = TOKEN_SECRET);
  }
}

module.exports = new Config();
