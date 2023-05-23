const { User, schemas: userSchemas } = require('./user.model');
const { Notice, schemas: noticeSchemas } = require('./notice.model');
const { Pet, schemas: petSchemas } = require('./pet.model');
const { Friend, schemas: friendSchemas } = require('./friend.model');

const {News} = require('./news.model');

const models = { User, Notice, Pet, Friend, News };
const schemas = { userSchemas, noticeSchemas, petSchemas, friendSchemas };

module.exports = { models, schemas };
