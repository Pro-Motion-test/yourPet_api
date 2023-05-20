const { models } = require('../models');
class Provider {
  constructor(modelName) {
    this.model = models[modelName];
  }
}
// console.log(Provider.model);
module.exports = { Provider };
