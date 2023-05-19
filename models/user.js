const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegex = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema({
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
    },
birthday: {
    type: Date,
    required: true,
    },
phone: {
    type: String,
    },
city: {
    type: String,
    },
avatarURL: {
    type: String,
    },
});

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(16).num(1).toUpperCase(1).toLowerCase(1).required(),
});

const formSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    name: Joi.string(),
    birthday: Joi.date().required(),
    city: Joi.string().str[0].toUpperCase(),
    phone: Joi.string().min(13).max(13).regex(/^[0-9]{13}$/),
});

const User = model('user', userSchema);

const schemas = {
    registerSchema,
    formSchema
};

module.exports = {
    schemas,
    User,
};