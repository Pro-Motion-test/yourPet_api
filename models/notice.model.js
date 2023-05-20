const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {
  requestConstants: { validation },
} = require('../constants');

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    likedByUsers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    price: Number,
    comments: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const createNoticeSchema = Joi.object({
  title: Joi.string()
    .min(validation.minTitle)
    .max(validation.maxTitle)
    .required(),
  name: Joi.string().min(validation.minName).max(validation.maxName).required(),
  category: Joi.string()
    .valid(
      validation.categoryValues.sell,
      validation.categoryValues.forFree,
      validation.categoryValues.lostFound
    )
    .required(),
  breed: Joi.string()
    .min(validation.minBreed)
    .max(validation.maxBreed)
    .required(),
  sex: Joi.string()
    .valid(validation.sexValues.male, validation.sexValues.female)
    .required(),
  location: Joi.string()
    .min(validation.minLocation)
    .max(validation.maxLocation)
    .required(),
  date: Joi.date().less('now').required(),
  price: Joi.number().positive(),
  comments: Joi.string()
    .min(validation.minComments)
    .max(validation.maxComments),
});

const schemas = { createNoticeSchema };

const Notice = model('Notice', NoticeSchema);

module.exports = { Notice, schemas };
