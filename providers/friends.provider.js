const { Provider } = require('./super');

class Friends extends Provider {
  constructor(modelName = 'Friend') {
    super(modelName);
  }
  async getFriends() {
    return await this.model.find();
  }
  
}

module.exports = new Friends('Friend');