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

router.get(
  '/',
  Authorization.checkTokenForPublicRoute,
  paginationValidate,
  controllers.Notice.getAll
);

router.get(
  '/own',
  Authorization.baseAuth,
  paginationValidate,
  controllers.Notice.getMy
);

router.get(
  '/favourite',
  Authorization.baseAuth,
  paginationValidate,
  controllers.Notice.getFavourite
);

router.get(
  '/:id',
  Authorization.checkTokenForPublicRoute,
  controllers.Notice.getById
);

router.post(
  '/',
  Authorization.baseAuth,
  bodyValidation(schemas.noticeSchemas.createNoticeSchema),
  controllers.Notice.createNotice
);

router.delete('/:id', Authorization.baseAuth, controllers.Notice.removeNotice);

router.patch(
  '/:id/favourite',
  Authorization.baseAuth,
  controllers.Notice.changeFavourite
);

module.exports = router;
