const { Provider } = require('./super');

class Pets extends Provider {
  constructor(modelName = 'Pet') {
    super(modelName);
  }
  async getAllPets({ owner, skip, limit }) {
    return await this.model.find({ owner }).skip(skip).limit(limit);
  }
  async createPet(data) {
    return await this.model.create(data);
  }
  async removePet(petId) {
    const result = await this.model.findByIdAndRemove(petId);
    return result;
  }
  async getTotalPages({ owner, limit }) {
    return Math.ceil(
      (
        await this.model.find({
          owner,
        })
      ).length / limit
    );
  }
}

module.exports = new Pets('Pet');
