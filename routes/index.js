const authRouter = require('./api/auth.router');
const noticesRouter = require('./api/notices.router');
const petsRouter = require('./api/pets.router');
const friendsRouter = require('./api/friends.router');
const newsRouter = require('./api/news.router');

module.exports = { authRouter, noticesRouter, petsRouter, friendsRouter, newsRouter };
