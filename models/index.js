const { User, schemas: userSchemas } = require('./user.model');
const { Notice, schemas: noticeSchemas } = require('./notice.model');
const { Pet, schemas: petSchemas } = require('./pet.model');

const models = { User, Notice, Pet };
const schemas = { userSchemas, noticeSchemas, petSchemas };

module.exports = models;
