const express = require('express');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');
const router = express.Router();
// -------------------------------------------------------
// Base endpoint
// /api/v1/auth
// -------------------------------------------------------
// ROUTES
// ---REGISTRATION---
router.post('/register', controllers.Auth.register);
// ---LOGIN---
router.post('/login', controllers.Auth.login);

// ---LOGOUT---
router.post(
  '/logout',
  // middlewares.Authorization.baseAuth,
  middlewares.Authorization.checkTokenForPublicRoute,
  controllers.Auth.logout
);

// ---CURRENT---
router.get('/current', middlewares.Authorization, controllers.Auth.current);

// ---REFRESHING---
router.post('/refresh', controllers.Auth.refreshing);

// ---VERIFICATION---
router.post('/verify');

module.exports = router;
