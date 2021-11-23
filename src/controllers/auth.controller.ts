import { Request, Response } from 'express';
import { AuthService } from '../database/services/auth.service';

import { hash as hashPassword } from '../utils/password';
import { generate as generateToken } from '../utils/token';
import { success } from '../utils/response';
import { created } from '../constants/responseMessages';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { CREATED } from '../constants/statusCodes';

/**
 * Auth Controller
 */
export class AuthController {
  /**
   * constructor
   * @param { authService: AuthService }
   */
  constructor(private authService: AuthService) {}

  /**
   * signup
   * @param { req: Request }
   * @param { res: Response }
   * @returns { object: User }
   * @memberOf AuthController
   */
  signup = async (req: Request, res: Response): Promise<Response> => {
    const userData: CreateUserDTO = req.body;
    const hashedPassword = hashPassword(userData.password);

    const user = await this.authService.signup({ ...userData, password: hashedPassword });

    const token = generateToken(user.id);

    return success({
      code: CREATED,
      message: created('User'),
      data: {
        token,
        email: user.email,
      },
      res,
    });
  };
}
