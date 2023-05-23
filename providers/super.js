const { models } = require('../models');
class Provider {
  constructor(modelName) {
    this.model = models[modelName];
  }
}

module.exports = { Provider };
