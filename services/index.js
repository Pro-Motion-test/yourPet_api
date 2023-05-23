const Auth = require('./auth.service');
const Notices = require('./notices.service');
const Pets = require('./pets.service');

const News = require('./');

const services = { Auth, Notices, Pets, News };
module.exports = services;
