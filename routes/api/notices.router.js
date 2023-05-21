const express = require('express');
const controllers = require('../../controllers');
const {
  Authorization,
  bodyValidation,
  paginationValidate,
} = require('../../middlewares');
const { schemas } = require('../../models');
const router = express.Router();

router.get('/', paginationValidate, controllers.Notice.getAll);

router.get(
  '/own',
  Authorization.baseAuth,
  paginationValidate,
  controllers.Notice.getMy
);

router.get('/:id', controllers.Notice.getById);

router.post(
  '/',
  Authorization.baseAuth,
  bodyValidation(schemas.noticeSchemas.createNoticeSchema),
  controllers.Notice.createNotice
);

router.delete('/:id', Authorization.baseAuth, controllers.Notice.removeNotice);

router.patch(
  '/:notId/favourite',
  Authorization.baseAuth,
  controllers.Notice.changeFavourite
);

router.get(
  '/favorite',
  Authorization.baseAuth,
  paginationValidate,
  controllers.Notice.getFavourite
);

module.exports = router;
