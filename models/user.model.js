const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegex = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/;

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
    newUser: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegex).required(),
  newUser: Joi.boolean(),
});

const formSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  name: Joi.string(),
  birthday: Joi.date().required(),
  city: Joi.string(),
  phone: Joi.string().min(13).max(13).pattern(phoneRegex),
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
