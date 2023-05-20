const { HttpException } = require('../helpers');
const { providers } = require('../providers/index');

class Pets {
  constructor() {}

  async addOnePet(data) {
    try {
      const createdPet = await providers.Pets.createPet(data);
      if (!createdPet) {
        throw HttpException.INTERNAL_SERVER_ERROR();
      }

      return createdPet;
    } catch (e) {
      throw HttpException.INTERNAL_SERVER_ERROR();
    }
  }
}

module.exports = new Pets();
