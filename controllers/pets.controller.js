const { providers } = require('../providers');
const { responseTemplates } = require('../constants');
const services = require('../services');

class Pets {
  constructor() {}

  static async getAllPets(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { id: owner } = req.user;
      const skip = (page - 1) * limit;

      const { pets, totalPages } = await services.Pets.getPets({
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
        avatarURL:
          'https://krasivosti.pro/uploads/posts/2021-04/1618053923_50-p-samie-milie-sobachki-sobaki-krasivo-foto-51.jpg',
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
      const { id: petId } = req.params;
      await services.Pets.deletePet(petId);

      //  --RESPONSE--
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Pets;
