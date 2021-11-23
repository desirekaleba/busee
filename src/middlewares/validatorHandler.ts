import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '../constants/statusCodes';
import { error as resError } from '../utils/response';

export const validatorHandler = (req: Request, res: Response, next: NextFunction, schema: any): any => {
  const { error } = schema.validate(req.body);

  if (error) {
    return resError({
      code: BAD_REQUEST,
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      res,
    });
  }
  return next();
};
