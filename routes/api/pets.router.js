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

// ---CREATE PET---
router.post(
  '/',
  Authorization.accessTokenAuth,
  upload.single('file'),
  bodyValidation(schemas.petSchemas.addPetSchema),
  controllers.Pets.addPet
);
// ---DELETE PET---
router.delete(
  '/:id',
  Authorization.accessTokenAuth,
  controllers.Pets.removePet
);
// ---GET PETS---
router.get(
  '/',
  Authorization.accessTokenAuth,
  paginationValidate,
  controllers.Pets.getAllPets
);

module.exports = router;
