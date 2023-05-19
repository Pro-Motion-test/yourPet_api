const express = require('express');
const router = express.Router();
// -------------------------------------------------------
// Base endpoint
// /api/v1/auth
// -------------------------------------------------------
// ROUTES
// ---REGISTRATION---
router.post('/register');
// ---LOGIN---
router.post('/login');

// ---LOGOUT---
router.post('/logout');

// ---CURRENT---
router.get('/current');

// ---REFRESHING---
router.post('/refresh');

// ---VERIFICATION---
router.post('/verify');
