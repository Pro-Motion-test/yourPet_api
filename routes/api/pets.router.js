const express = require('express');
const controllers = require('../../controllers');
const {
  Authorization,
  bodyValidation,
  paginationValidate,
  upload,
} = require('../../middlewares');
const { schemas } = require('../../models');
const router = express.Router();

router.post(
  '/',
  Authorization.baseAuth,
  upload.single('file'),
  bodyValidation(schemas.petSchemas.addPetSchema),
  controllers.Pets.addPet
);
// ---DELETE PET---
router.delete('/:id', Authorization.baseAuth, controllers.Pets.removePet);
// ---GET PETS---
router.get(
  '/',
  Authorization.baseAuth,
  paginationValidate,
  controllers.Pets.getAllPets
);

module.exports = router;
