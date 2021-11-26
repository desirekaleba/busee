import { Request, Response } from 'express';
import { AuthService } from '../database/services/auth.service';

import { hash as hashPassword, compare as comparePassword } from '../utils/password';
import { generate as generateToken } from '../utils/token';
import { error, success } from '../utils/response';
import { created, notFound } from '../constants/responseMessages';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';
import { SigninUserDTO } from '../dtos/signinUser.dto';

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

  /**
   * signin
   * @param { req: Request }
   * @param { res: Response }
   * @returns { Object: User }
   * @memberOf AuthController
   */
  signin = async (req: Request, res: Response): Promise<Response> => {
    const signinData: SigninUserDTO = req.body;

    const user = await this.authService.signin({ ...signinData });

    if (user) {
      if (comparePassword(signinData.password, user.password)) {
        const token = generateToken(user.id);
        return success({
          code: OK,
          message: 'user found.',
          data: {
            token,
            userId: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          res,
        });
      }
      return error({
        code: UNAUTHORIZED,
        message: `Incorrect password.`,
        res,
      });
    }
    return error({
      code: NOT_FOUND,
      message: notFound(`User with '${signinData.email}'`),
      res,
    });
  };
}
