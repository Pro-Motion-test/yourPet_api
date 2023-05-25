const { Schema, model } = require('mongoose');
const Joi = require('joi');
const mongooseServerError = require('./mongooseServerError');

const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'Name is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'Breed is required'],
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
      required: true,
    },
  },
  { versionKey: false }
);
petSchema.post('save', mongooseServerError);

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  date: Joi.date().less('now').required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120),
});

const schemas = {
  addPetSchema,
};

const Pet = model('Pet', petSchema);

module.exports = {
  Pet,
  schemas,
};
