import { Response } from 'express';
import { ISuccess, IError } from '../interfaces/response.interface';

/**
 * success
 * @param { { code, status, data, res }: ISuccess }
 * @returns { res: Response }
 */
export const success = ({ code, status = 'success', message, data, res }: ISuccess): Response =>
  res.status(code).json({
    status,
    message,
    data,
  });

/**
 * error
 * @param { { code, message, res }: IError }
 * @returns { res: Response }
 */
export const error = ({ code, status = 'error', message, res }: IError): Response =>
  res.status(code).json({
    status,
    message,
  });
