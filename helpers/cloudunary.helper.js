const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = require('../config');
class Cloudinary {
  constructor({ cloudinary, config, options }) {
    this.config = cloudinary.config(config);
    this.cloudinary = cloudinary;
    this.options = options;
  }
}
module.exports = new Cloudinary({
  cloudinary,
  config: {
    cloud_name: 'deoplx5oc',
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET,
  },
  options: {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  },
});
