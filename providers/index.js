const Auth = require('./auth.provider');
const Notices = require('./notices.provider');
const Pets = require('./pets.provider');

const News = require('./news.provider');
const providers = { Auth, Notices, Pets, News };
module.exports = { providers };
