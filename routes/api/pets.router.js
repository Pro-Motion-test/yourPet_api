const express = require('express');
const controllers = require('../../controllers');
const {
  Authorization,
  bodyValidation,
  paginationValidate,
} = require('../../middlewares');
const { schemas } = require('../../models');
const router = express.Router();

router.post(
  '/',
  Authorization.baseAuth,
  bodyValidation(schemas.petSchemas.addPetSchema),
  controllers.Pets.addPet
);
// ---DELETE PET---
router.delete('/:petId', Authorization.baseAuth, controllers.Pets.removePet);
// ---GET PETS---
router.get('/', Authorization.baseAuth, controllers.Pets.getAllPets);

module.exports = router;
