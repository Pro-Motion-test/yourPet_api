const express = require('express');
const controllers = require('../../controllers');
const { Authorization } = require('../../middlewares');
const router = express.Router();

router.get('/', controllers.Notice.getAll);

router.get('/:notId', controllers.Notice.getById);

router.patch(
  '/:notId/favourite',
  Authorization.baseAuth,
  controllers.Notice.changeFavourite
);

router.get(
  '/favorite',
  Authorization.baseAuth,
  controllers.Notice.getFavourite
);

router.post('/', Authorization.baseAuth, controllers.Notice.createNotice);

router.delete(
  '/:notId',
  Authorization.baseAuth,
  controllers.Notice.removeNotice
);

router.get('/own', Authorization.baseAuth, controllers.Notice.getMy);

module.exports = router;
