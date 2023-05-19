const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
    price: Number,
    comments: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const objSchema = {
  title: Joi.string().min(2).max(50).required(),
  name: Joi.string().min(2).max(16).required(),
  category: Joi.string().valid('sell', 'for-free', 'lost-found').required(),
  breed: Joi.string().min(2).max(16).required(),
  sex: Joi.string().valid('male', 'female').required(),
  location: Joi.string().min(2).max(25).required(),
  date: Joi.date().less('now').required(),
  comments: Joi.string().min(8).max(120),
};

const createNoticeForSellSchema = Joi.object({
  ...objSchema,
  price: Joi.number().min(0).required(),
});

const createNoticeForOtherSchema = Joi.object().keys({
  ...objSchema,
  price: Joi.number().min(0),
});

const schemas = { createNoticeForSellSchema, createNoticeForOtherSchema };

const Notice = model('Notice', NoticeSchema);

module.exports = { Notice, schemas };
