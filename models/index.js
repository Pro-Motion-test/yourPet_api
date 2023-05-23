const { User, schemas: userSchemas } = require('./user.model');
const { Notice, schemas: noticeSchemas } = require('./notice.model');
const { Pet, schemas: petSchemas } = require('./pet.model');
const { Friend, schemas: friendSchemas } = require('./friend.model');

const models = { User, Notice, Pet, Friend };
const schemas = { userSchemas, noticeSchemas, petSchemas, friendSchemas };

module.exports = { models, schemas };
