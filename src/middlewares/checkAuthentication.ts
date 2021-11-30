import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/statusCodes';
import { userService } from '../database/services';
import { IRequestWithAuth } from '../interfaces/requestWithAuth.interface';
import { error } from '../utils/response';
import secrets from '../utils/secrets';

// eslint-disable-next-line consistent-return
export const checkAuthentication = (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];
  if (!token) {
    return error({
      code: UNAUTHORIZED,
      message: 'Please login.',
      res,
    });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, `${secrets.JWT_SECRET_KEY}`, async (err, decoded: any) => {
    if (err || !decoded) {
      return error({
        code: UNAUTHORIZED,
        message: 'Please login.',
        res,
      });
    }
    const { id }: { id: number } = decoded;
    const user = await userService.findById(id);
    if (!user) {
      return error({
        code: UNAUTHORIZED,
        message: 'Please login.',
        res,
      });
    }
    req.currentUser = user;
    next();
  });
};
