import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares';

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    firstName: Joi.string().trim().alphanum().min(3).max(30),
    lastName: Joi.string().trim().alphanum().min(3).max(30),
    profileImage: Joi.string().trim().alphanum(),
    password: Joi.string()
      .trim()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
    isAdmin: Joi.bool(),
    isVerified: Joi.bool(),
  });
  validatorHandler(req, res, next, schema);
};

export const signin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

export const verifyAccount = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    to: Joi.string().trim().required(),
    code: Joi.string().min(6).max(6).required(),
  });
  validatorHandler(req, res, next, schema);
};

export const getByEmail = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
  });
  validatorHandler(req, res, next, schema);
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email,
    firstName: Joi.string().trim().alphanum().min(3).max(30),
    lastName: Joi.string().trim().alphanum().min(3).max(30),
    profileImage: Joi.string().trim().alphanum(),
    password: Joi.string()
      .trim()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/),
    isAdmin: Joi.bool(),
    isVerified: Joi.bool(),
  });
  validatorHandler(req, res, next, schema);
};
