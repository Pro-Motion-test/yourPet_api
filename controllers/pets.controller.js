const { responseTemplates } = require('../constants');
const services = require('../services');
const { HttpException } = require('../helpers');

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
      res.status(200).json({
        response: {
          ...responseTemplates.SUCCESS_GET_RESPONSE,
          message: 'Successfully processed',
        },
        body: { page, limit, totalPages, data: pets },
      });
    } catch (e) {
      next(e);
    }
  }
  static async addPet(req, res, next) {
    try {
      const { id: owner } = req.user;

      if (!req.file) {
        throw HttpException.NOT_FOUND('No file uploaded');
      }

      await services.Pets.addOnePet({
        ...req.body,
        owner,
        avatarURL: req.file.path,
      });

      //  --RESPONSE--
      res.status(201).json({
        response: {
          ...responseTemplates.SUCCESS_POST_RESPONSE,
          message: 'Successfully created pet',
        },
      });
    } catch (e) {
      next(e);
    }
  }
  static async removePet(req, res, next) {
    try {
      const { id: petId } = req.params;
      const result = await services.Pets.deletePet(petId);

      //  --RESPONSE--
      res.status(200).json({
        response: {
          ...responseTemplates.SUCCESS_DELETE_RESPONSE,
          message: 'Successfully deleted pet',
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Pets;
