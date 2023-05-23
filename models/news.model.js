const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const newsSchema = new Schema(
  {
    imgUrL: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
newsSchema.post('save', handleMongooseError.mongooseServerError);

const News = model('News', newsSchema);

module.exports = {
  News,
};
