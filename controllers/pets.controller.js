const services = require('../services');

class Pets {
  constructor() {}

  static async getAllPets(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(201).json();
    } catch (e) {
      next(e);
    }
  }
  static async addPets(req, res, next) {
    try {
      const newPet = await services.Pets.addOnePet(req.body);
      //  --RESPONSE--
      res.status(201).json(newPet);
    } catch (e) {
      next(e);
    }
  }
  static async removePet(req, res, next) {
    try {
      //  --RESPONSE--
      res.status(201).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Pets;
