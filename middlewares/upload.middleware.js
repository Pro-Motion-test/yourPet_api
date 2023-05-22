const cloudinary = require('cloudinary');
const multer = require('multer');
const { CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = require('../config');
class Cloudinary {
  constructor(cloudinary, config) {
    this.config = cloudinary.config(config);
    this.cloudinary = cloudinary;
  }
  async upload(fieldName) {
    this.config;
    const storage = new CloudinaryStorage({
      cloudinary: this.cloudinary,
      folder: 'avatars',
      allowedFormats: ['jpg', 'png'],
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const uploadCloud = multer({ storage });
    return uploadCloud.single(fieldName);
  }
}
module.exports = new Cloudinary(cloudinary, {
  cloud_name: 'deoplx5oc',
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});
