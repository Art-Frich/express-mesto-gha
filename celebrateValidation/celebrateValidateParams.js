const { Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { regExpEmail, regExpUrl, regExpObjectId, minLen, maxLen } = require('../helpers/constants');

// Общие правила валидации
module.exports.nameSchema = Joi.string().min(minLen).max(maxLen);
module.exports.aboutSchema = Joi.string().min(minLen).max(maxLen);
module.exports.emailSchema = Joi.string().required().pattern(regExpEmail);
module.exports.passwordSchema = Joi.string().required();
module.exports.avatarSchema = Joi.string().pattern(regExpUrl);
module.exports.linkSchema = Joi.string().required().pattern(regExpUrl);
module.exports.objectIdSchema = Joi.string().pattern(regExpObjectId);
