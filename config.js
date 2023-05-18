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
  async startEngine(db) {
    const serverErrorMessage = 'Error! Server launch failed. ';
    const databaseErrorMessage = 'Error! Database launch failed.';
    try {
      console.log('Connecting to database..');
      await db();
      console.log('Starting the server..');
      app.listen(PORT, e => {
        if (!e) {
          return;
        }
        return console.error(serverErrorMessage, e);
      });
      console.log(
        `Successful! Server is running. Use our API on port: ${PORT}. Base URL is: "${BASE_URL}"`
      );
    } catch (e) {
      console.error(databaseErrorMessage, e);
      process.exit(1);
    }
  }
}
module.exports = new Config();
