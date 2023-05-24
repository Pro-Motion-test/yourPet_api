const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {
  requestConstants: { validation },
} = require('../constants');
const mongooseServerError = require('./mongooseServerError');

const noticeSchema = new Schema(
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
noticeSchema.post('save', mongooseServerError);
// ----------------------------------------------------------
const createNoticeSchema = Joi.object({
  title: Joi.string()
    .min(validation.minTitle)
    .max(validation.maxTitle)
    .required(),
  name: Joi.string().min(validation.minName).max(validation.maxName).required(),
  category: Joi.string()
    .valid(
      validation.categoryValues.SELL,
      validation.categoryValues.FOR_FREE,
      validation.categoryValues.LOST_FOUND
    )
    .required(),
  breed: Joi.string()
    .min(validation.minBreed)
    .max(validation.maxBreed)
    .required(),
  sex: Joi.string()
    .valid(validation.sexValues.MALE, validation.sexValues.FEMALE)
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

const Notice = model('Notice', noticeSchema);

module.exports = { Notice, schemas };
