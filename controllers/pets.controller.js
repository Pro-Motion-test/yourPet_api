const { providers } = require('../providers');

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
      const { id: owner } = req.user;
      const newPet = await providers.Pets.createPet({
        ...req.body,
        owner,
        petavatarURL: '',
      });
      //  --RESPONSE--
      res.status(201).json({ message: 'Created pet' });
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
