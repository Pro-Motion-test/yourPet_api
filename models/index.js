const { User, schemas } = require('./user.model');
const { Pet, addPetSchema } = require('./pet.model');

const user = { User, schemas };
// const notice = { Notice, schemas}
const pet = { Pet, addPetSchema };
const models = { user, pet };
module.exports = models;
