const { Provider } = require('./super');

class Pets extends Provider {
  constructor(modelName = 'Pet') {
    super(modelName);
  }

  async getAllPets({ owner, skip, limit }) {
    return await this.model.find({ owner }).skip(skip).limit(limit);
  }
  async createPet(data) {
    const newPet = await this.model.create(data);
    console.log(newPet);
    return newPet;
  }
  async removePet(id) {
    const result = await this.model.findByIdAndRemove(id);
  }
}

module.exports = new Pets('Pet');
