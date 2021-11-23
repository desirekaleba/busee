import { Request, Response, NextFunction } from 'express';

import { error } from '../utils/response';
import { SERVER_ERROR } from '../constants/statusCodes';

export const asyncHandler = (cb: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cb(req, res, next);
  } catch (err: any) {
    return error({
      code: SERVER_ERROR,
      message: err.message,
      res,
    });
  }
  return true;
};
