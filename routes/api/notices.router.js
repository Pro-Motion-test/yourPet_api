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

// ---CREATE NOTICE---
router.post(
  '/',
  Authorization.accessTokenAuth,
  upload.single('file'),
  bodyValidation(schemas.noticeSchemas.createNoticeSchema),
  controllers.Notice.createNotice
);

// ---GET NOTICES---
router.get(
  '/',
  Authorization.checkTokenForPublicRoute,
  paginationValidate,
  controllers.Notice.getAll
);

// ---GET OWN NOTICES---
router.get(
  '/own',
  Authorization.accessTokenAuth,
  paginationValidate,
  controllers.Notice.getMy
);

// ---GET FAVORITE NOTICES---
router.get(
  '/favorite',
  Authorization.accessTokenAuth,
  paginationValidate,
  controllers.Notice.getFavourite
);

// ---GET ONE NOTICE---
router.get(
  '/:id',
  Authorization.checkTokenForPublicRoute,
  controllers.Notice.getById
);

// ---DELETE NOTICE---
router.delete(
  '/:id',
  Authorization.accessTokenAuth,
  controllers.Notice.removeNotice
);

// ---SELECT TO FAVORITES OR REMOVE FROM FAVORITES---
router.patch(
  '/:id/favorite',
  Authorization.accessTokenAuth,
  controllers.Notice.changeFavourite
);

module.exports = router;
