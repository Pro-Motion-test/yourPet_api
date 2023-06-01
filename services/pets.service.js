const { providers } = require('../providers');
const { HttpException } = require('../helpers');

class Pets {
  constructor() {}
  async getPets({ owner, skip, limit }) {
    const { pets, totalPages } = await providers.Pets.getAllPets({
      owner,
      skip,
      limit,
    });

    return { pets, totalPages };
  }
  async addOnePet(data) {
    return await providers.Pets.createPet(data);
  }
  async deletePet(petId) {
    const result = await providers.Pets.removePet(petId);
    if (!result) {
      throw HttpException.NOT_FOUND('Cannot find pet with this id');
    }
    return result;
  }
}

module.exports = new Pets();
