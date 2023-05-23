const Auth = require('./auth.controller');
const Notice = require('./notices.controller');
const Pets = require('./pets.controller');
const Friends = require('./friends.controller');
const News = require('./news.controller');
const controllers = { Auth, Notice, Pets, Friends, News };
module.exports = controllers;
