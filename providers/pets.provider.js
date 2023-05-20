const {Provider} = require('./super')

class Pets {
  model;
  constructor(model) {
    this.model = model;
  }

  async getAllPets({}, { skip, limit }) {
    const pets = await this.model.find({}, '', { skip, limit });

    return pets;
  }
  async createPet(data) {
    console.log(data);
    const newPet = await this.model.create(data);
    console.log(newPet);

    return newPet;
  }
  async removePet(id) {
    const result = await this.model.findByIdAndRemove(id);
  }
}

module.exports = new Pets(Pet);
