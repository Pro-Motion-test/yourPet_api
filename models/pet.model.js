const { Schema, model } = require('mongoose');
const Joi = require('joi');

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
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
    comments: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

const createPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(16).required(),
  date: Joi.date().less('now').required(),
  comments: Joi.string().min(8).max(120),
});

const schemas = { createPetSchema };

const Pet = model('Pet', PetSchema);

module.exports = { Pet, schemas };
