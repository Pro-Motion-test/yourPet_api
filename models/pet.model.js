const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {
  requestConstants: { validation },
} = require('../constants');
const mongooseServerError = require('./mongooseServerError');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);
petSchema.post('save', mongooseServerError);

const addPetSchema = Joi.object({
  name: Joi.string().min(validation.minName).max(validation.maxName).required(),
  date: Joi.date().less('now').required(),
  breed: Joi.string()
    .min(validation.minBreed)
    .max(validation.maxBreed)
    .required(),
  comments: Joi.string()
    .min(validation.minComments)
    .max(validation.maxComments),
});

const schemas = {
  addPetSchema,
};

const Pet = model('Pet', petSchema);

module.exports = {
  Pet,
  schemas,
};
