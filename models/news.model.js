const { Schema, model } = require('mongoose');
const mongooseServerError = require('./mongooseServerError');

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
newsSchema.post('save', mongooseServerError);

const News = model('News', newsSchema);

module.exports = {
  News,
};
