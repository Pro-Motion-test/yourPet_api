const { providers } = require('../providers');
const { HttpException } = require('../helpers');

class Pets {
  constructor() {}

  static async getAllPets(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { id: owner } = req.user;
      const skip = (page - 1) * limit;

      const totalPages = await providers.Pets.getTotalPages({
        owner,
        limit,
      });

      const pets = await providers.Pets.getAllPets({
        owner,
        skip,
        limit,
      });
      //  --RESPONSE--
      res.json({ page, limit, totalPages, data: pets });
    } catch (e) {
      next(e);
    }
  }
  static async addPets(req, res, next) {
    try {
      const { id: owner } = req.user;

      const newPet = await providers.Pets.createPet({
        ...req.body,
        owner,
        petURL: 'dddd',
      });
      //  --RESPONSE--
      res.status(201).json({ message: 'Created pet' });
    } catch (e) {
      next(e);
    }
  }
  static async removePet(req, res, next) {
    try {
      const { petId } = req.params;
      const result = await providers.Pets.removePet(petId);

      if (!result) {
        throw HttpException.NOT_FOUND();
      }

      //  --RESPONSE--
      res.status(201).json({ message: 'Pet deleted successfully' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Pets;
