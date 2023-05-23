const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { CloudinaryHelper } = require('../helpers');
const cloudinary = CloudinaryHelper.cloudinary;
CloudinaryHelper.config;
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = upload;
