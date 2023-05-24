const { Schema, model } = require('mongoose');
const Joi = require('joi');
const mongooseServerError = require('./mongooseServerError');

const emailRegex = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

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
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: [
        {
          isOpen: { type: Boolean, required: true },
          from: { type: Date, default: null },
          to: { type: Date, default: null },
        },
      ],
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);
friendSchema.post('save', mongooseServerError);

const addFriendSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  addressUrl: Joi.string(),
  imageUrl: Joi.string(),
  address: Joi.string(),
  workDays: Joi.array(),
  phone: Joi.string(),
  email: Joi.string().pattern(emailRegex),
});

const Friend = model('friend', friendSchema);

const schemas = {
  addFriendSchema,
};

module.exports = {
  schemas,
  Friend,
};
