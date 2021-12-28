import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares';

export const createCurrency = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    name: Joi.string().trim().required(),
    initials: Joi.string().trim().required(),
  });
  validatorHandler(req, res, next, schema);
};
