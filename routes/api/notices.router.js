const express = require('express');
const controllers = require('../../controllers');
const {
  Authorization,
  bodyValidation,
  paginationValidate,
} = require('../../middlewares');
const { schemas } = require('../../models');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Настройка Cloudinary
cloudinary.config({
  cloud_name: 'dfms27k9p',
  api_key: '467861895157293',
  api_secret: '43cCK_Tenfd109w1w8zlgIKeBAo',
});

// Настройка хранилища Multer для загрузки файлов на Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Папка, в которую будут загружаться изображения
    allowedFormats: ['jpg', 'jpeg', 'png'], // Разрешенные форматы файлов
  },
});

// Использование Multer для обработки входящих файлов
const upload = multer({ storage: storage });

router.post(
  '/',
  Authorization.baseAuth,
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

router.delete('/:id', Authorization.baseAuth, controllers.Notice.removeNotice);

router.patch(
  '/:id/favourite',
  Authorization.baseAuth,
  controllers.Notice.changeFavourite
);

module.exports = router;
