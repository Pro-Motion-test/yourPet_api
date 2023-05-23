const Auth = require('./auth.service');
const Notices = require('./notices.service');
const Pets = require('./pets.service');
const Friends = require('./friends.service');

const services = { Auth, Notices, Pets, Friends };
module.exports = services;
