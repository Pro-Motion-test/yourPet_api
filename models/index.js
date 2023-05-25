const { User, schemas: userSchemas } = require('./user.model');
const { Notice, schemas: noticeSchemas } = require('./notice.model');
const { Pet, schemas: petSchemas } = require('./pet.model');
const { Friend } = require('./friend.model');

const { News } = require('./news.model');

const models = { User, Notice, Pet, Friend, News };
const schemas = { userSchemas, noticeSchemas, petSchemas };

module.exports = { models, schemas };
