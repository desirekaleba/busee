import { Request } from 'express';
import { User } from '../database/entity/User';

export interface IRequestWithAuth extends Request {
  currentUser: User;
}
