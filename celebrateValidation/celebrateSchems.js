const { Joi } = require('celebrate');
const {
  nameSchema, aboutSchema, emailSchema, passwordSchema, avatarSchema, linkSchema, objectIdSchema,
} = require('./celebrateValidateParams');

module.exports.signinSchema = {
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
};

module.exports.signupSchema = {
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
};

module.exports.checkUserIdSchema = {
  params: Joi.object().keys({
    userId: objectIdSchema,
  }),
};

module.exports.patchMeSchema = {
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
  }),
};

module.exports.patchAvatarSchema = {
  body: Joi.object().keys({
    avatar: avatarSchema,
  }),
};

module.exports.postCardSchema = {
  body: Joi.object().keys({
    name: nameSchema.required(),
    link: linkSchema,
  }),
};

module.exports.checkCardIdSchema = {
  params: Joi.object().keys({
    cardId: objectIdSchema,
  }),
};
