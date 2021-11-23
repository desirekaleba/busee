import { Response } from 'express';

export interface ISuccess {
  code: number;
  status?: string;
  message: string;
  data: object;
  res: Response;
}

export interface IError {
  code: number;
  status?: string;
  message: string;
  res: Response;
}
