const { Provider } = require('./super');
// extends Provider
class Auth extends Provider {
  constructor(modelCategory = 'user', modelName = 'User') {
    super(modelCategory, modelName);
  }
  async getAllUsers({ skip, limit }) {
    const users = await this.model.find({}, '', { skip, limit });
    return users;
  }
  async getUserById(id) {
    const user = await this.model.findById(id);
    return user;
  }
  async getUser(searchParams) {
    const user = await this.model.findOne(searchParams);
    return user;
  }
  async createUser(userData) {
    const newUser = await this.model.create(userData);
    return newUser;
  }
  async updateUser(id, userData) {
    const updatedUser = await this.model.findByIdAndUpdate(id, userData);
    return updatedUser;
  }
  async removeUser(id, userData) {
    const updatedUser = await this.model.findByIdAndRemove(id, userData);
    return updatedUser;
  }
}
module.exports = new Auth('user', 'User');
