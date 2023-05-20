const express = require('express');
const controllers = require('../../controllers');
const { bodyValidation } = require('../../middlewares');
const { schemas } = require('../../models');
const router = express.Router();
// -------------------------------------------------------
// Base endpoint
// /api/v1/pet
// -------------------------------------------------------
// ROUTES
// ---ADD PET---
router.post(
  '/',
  bodyValidation(schemas.petSchemas.addPetSchema),
  controllers.Pets.addPets
);
// ---DELETE PET---
router.delete('/:petId');
// ---GET PETS---
router.get('/');

module.exports = router;
