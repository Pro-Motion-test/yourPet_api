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
  middlewares.Authorization.accessTokenAuth,
  controllers.Auth.logout
);

// ---CURRENT---
router.get(
  '/current',
  middlewares.Authorization.accessTokenAuth,
  controllers.Auth.current
);
// ---UPDATING-USER-DATA---
router.put(
  '/update',
  middlewares.Authorization.accessTokenAuth,
  middlewares.upload.single('file'),
  controllers.Auth.updateData
);
// ---REFRESHING---
router.post(
  '/refresh',
  middlewares.Authorization.checkRefreshToken,
  controllers.Auth.refreshing
);

// ---VERIFICATION---
router.post('/verify', middlewares.Authorization.accessTokenAuth);

module.exports = router;
