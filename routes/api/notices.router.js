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
  Authorization.accessTokenAuth,
  upload.single('file'),
  bodyValidation(schemas.noticeSchemas.createNoticeSchema),
  controllers.Notice.createNotice
);

router.get(
  '/',
  Authorization.checkTokenForPublicRoute,
  paginationValidate,
  controllers.Notice.getAll
);

router.get(
  '/own',
  Authorization.accessTokenAuth,
  paginationValidate,
  controllers.Notice.getMy
);

router.get(
  'favorite',
  Authorization.accessTokenAuth,
  paginationValidate,
  controllers.Notice.getFavourite
);

router.get(
  '/:id',
  Authorization.checkTokenForPublicRoute,
  controllers.Notice.getById
);

router.delete(
  '/:id',
  Authorization.accessTokenAuth,
  controllers.Notice.removeNotice
);

router.patch(
  '/:id/favorite',
  Authorization.accessTokenAuth,
  controllers.Notice.changeFavourite
);

module.exports = router;
