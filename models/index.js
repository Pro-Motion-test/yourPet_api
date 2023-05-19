const { User, schemas } = require('./user.model');
const { Notice } = require('./notice.model');
const { Pet } = require('./pet.model');

const user = { User, schemas };
const notice = { Notice, schemas };
const pet = { Pet, schemas };

const models = { user, notice, pet };
module.exports = models;
