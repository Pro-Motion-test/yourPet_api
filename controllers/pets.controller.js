const { providers } = require('../providers');
// const { HttpException } = require('../helpers');
const { responseTemplates } = require('../constants');
const services = require('../services');

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

      const pets = await services.Pets.getPets({
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
  static async addPet(req, res, next) {
    try {
      const { id: owner } = req.user;

      await services.Pets.addOnePet({
        ...req.body,
        owner,
        petURL: 'dddd',
      });

      //  --RESPONSE--
      res.status(201).json({
        ...responseTemplates.SUCCESS_POST_RESPONSE,
        message: 'Created pet',
      });
    } catch (e) {
      next(e);
    }
  }
  static async removePet(req, res, next) {
    try {
      const { petId } = req.params;
      await services.Pets.deletePet(petId);

      //  --RESPONSE--
      res.status(201).json({
        ...responseTemplates.SUCCESS_POST_RESPONSE,
        message: 'Pet deleted successfully',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Pets;
