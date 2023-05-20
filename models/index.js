const { User, schemas } = require('./user.model');
const { Notice, noticeSchemas } = require('./notice.model');
const { Pet } = require('./pet.model');

const user = { User, schemas };
const notice = { Notice, noticeSchemas };
const pet = { Pet };

const models = { user, notice, pet };
module.exports = models;
