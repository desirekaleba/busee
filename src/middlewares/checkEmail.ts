import { Request, Response, NextFunction } from 'express';
import { error } from '../utils/response';
import { exists } from '../constants/responseMessages';
import { userService } from '../database/services';
import { BAD_REQUEST } from '../constants/statusCodes';

export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email }: { email: string } = req.body;
  const user = await userService.findByEmail(email);
  if (user) {
    return error({
      code: BAD_REQUEST,
      message: exists(`A user with email address '${email}'`),
      res,
    });
  }
  return next();
};
