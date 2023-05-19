const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegex = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    birthday: {
      type: Date,
      default: '',
    },
    token: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    // .uppercase()
    // .lowercase(1)
    .required(),
});

const formSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  name: Joi.string(),
  // birthday: Joi.date().format('DD-MM-YYYY').max('now').required(),
  // city: Joi.string().str[0].toUpperCase(),
  phone: Joi.string()
    .min(13)
    .max(13)
    .regex(/^[0-9]{13}$/),
  avatarURL: Joi.string().required(),
});

const User = model('user', userSchema);

const schemas = {
  registerSchema,
  formSchema,
};

module.exports = {
  schemas,
  User,
};
