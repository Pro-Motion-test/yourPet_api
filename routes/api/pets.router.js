const express = require('express');
const controllers = require('../../controllers');
const router = express.Router();
// -------------------------------------------------------
// Base endpoint
// /api/v1/pet
// -------------------------------------------------------
// ROUTES
// ---ADD PET---
router.post('/', controllers.Pets.addPets);
// ---DELETE PET---
router.delete('/:petId');
// ---GET PETS---
router.get('/');

module.exports = router;
