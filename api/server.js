const app = require('./app');

const db = require('./db/connection');
const { PORT, BASE_URL } = require('./config');
const startServer = async () => {
  const serverErrorMessage = 'Error! Server launch failed. ';
  const databaseErrorMessage = 'Error! Database launch failed.';
  try {
    console.log('Connecting to database..');
    // await db();
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
};
startServer();
