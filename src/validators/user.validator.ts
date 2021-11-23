import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';

const signup = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().trim().alphanum().min(3).max(30),
    lastName: Joi.string().trim().alphanum().min(3).max(30),
    profileImage: Joi.string().trim().alphanum(),
    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
    isAdmin: Joi.bool(),
    isVerified: Joi.bool(),
  });
  validatorHandler(req, res, next, schema);
};

export const userValidator = {
  signup,
};
