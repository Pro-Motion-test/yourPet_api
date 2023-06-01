const { Provider } = require('./super');

class Pets extends Provider {
  constructor(modelName = 'Pet') {
    super(modelName);
  }
  async getAllPets({ owner, skip, limit }) {
    const pets = await this.model
      .find({ owner }, { owner: 0 })
      .skip(skip)
      .limit(limit);

    const count = await this.model.countDocuments({ owner });
    const totalPages = Math.ceil(count / limit);

    return { pets, totalPages };
  }
  async createPet(data) {
    return await this.model.create(data);
  }
  async removePet(petId) {
    const result = await this.model.findByIdAndRemove(petId);
    return result;
  }
}

module.exports = new Pets('Pet');
