const models = require('../models');
// console.log(models['user']['User']);
class Provider {
  constructor(modelCategory, modelName) {
    this.model = models[modelCategory][modelName];
  }
}
// console.log(Provider.model);
module.exports = { Provider };
