import Joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().pattern(new RegExp('([A-Z][a-zA-Z]{2,})')).required(),
    lastName: Joi.string().pattern(new RegExp('([A-Z][a-zA-Z]{2,})')).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(4)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      error: error.details[0].message,
    });
  } else {
    next();
  }
};

export const passwordValidator = (req, res, next) => {
  const schema = Joi.object({
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(4)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      error: error.details[0].message,
    });
  } else {
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(4)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      error: error.details[0].message,
    });
  } else {
    next();
  }
};

export const emailValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      code: 400,
      error: error.details[0].message,
    });
  } else {
    next();
  }
};