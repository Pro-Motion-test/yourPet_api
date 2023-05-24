const { Schema, model } = require('mongoose');
const mongooseServerError = require('./mongooseServerError');

const friendSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addressUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    workDays: {
      type: [
        {
          from: { type: Date, required: true },
          to: { type: Date, required: true },
        },
      ],
      default: null,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
friendSchema.post('save', mongooseServerError);

const Friend = model('friend', friendSchema);

module.exports = {
  Friend,
};
