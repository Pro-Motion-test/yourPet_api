const middlewares = require('./middlewares');

const cloudinary = middlewares.upload.cloudinary;

const some = async () => {
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(
      './public/images/ds-avatar.png',
      options
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
some();
