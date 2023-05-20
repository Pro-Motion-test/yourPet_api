const Auth = require('./auth.provider');
const Notices = require('./notices.provider');
const Pets = require('./pets.provider');
const providers = { Auth, Notices, Pets };
module.exports = { providers };
