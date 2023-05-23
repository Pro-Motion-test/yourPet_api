const Auth = require('./auth.controller');
const Notice = require('./notices.controller');
const Pets = require('./pets.controller');

const News = require('./news.controller');
const controllers = { Auth, Notice, Pets, News };
module.exports = controllers;
