import { Request, Response } from 'express';
import { AuthService } from '../database/services/auth.service';

import { hash as hashPassword, compare as comparePassword } from '../utils/password';
import { generate as generateToken } from '../utils/token';
import { error, success } from '../utils/response';
import { created, notFound, updated } from '../constants/responseMessages';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK, SERVER_ERROR, UNAUTHORIZED } from '../constants/statusCodes';
import { SigninUserDTO } from '../dtos/signinUser.dto';
import { TwilioService } from '../plugins/twilio';
import { UserService } from '../database/services/user.service';

import secrets from '../utils/secrets';
/**
 * Auth Controller
 */
export class AuthController {
  /**
   * constructor
   * @param { authService: AuthService }
   * @param { twilioService: TwilioService }
   * @param { userService: UserService}
   */
  constructor(
    private authService: AuthService,
    private twilioService: TwilioService,
    private userService: UserService,
  ) {}

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

    if (secrets.NODE_ENV === 'production') {
      await this.twilioService.sendVerificationCode(user.email, 'email');
    }

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

  /**
   * /**
   * send verification code
   * @param { req: Request}
   * @param { res: Response }
   * @returns Response
   * @memberof AuthController
   */
  sendVerificationCode = async (req: Request, res: Response): Promise<Response> => {
    const { to, channel } = req.body;
    const details = await this.twilioService.sendVerificationCode(to, channel);
    if (details) {
      return success({
        code: OK,
        message: `Verification code sent to ${to}`,
        data: details,
        res,
      });
    }
    return error({
      code: SERVER_ERROR,
      message: 'Could not send verification code. Please try again later.',
      res,
    });
  };

  /**
   * verify Account
   * @param { req: Request}
   * @param { res: Response }
   * @returns User - Verified User
   * @memberof AuthController
   */
  verifyAccount = async (req: Request, res: Response): Promise<Response> => {
    const { to, code } = req.body;
    const user = await this.userService.findByEmail(to);

    if (user && user.isVerified) {
      return error({
        code: BAD_REQUEST,
        message: 'User already verified.',
        res,
      });
    }

    const verifyUser = await this.twilioService.verifyCode(to, code);

    if (user && verifyUser.valid && verifyUser.status === 'approved') {
      const verifiedUser = await this.userService.update(user.id, { isVerified: true });

      const token = generateToken(Number(verifiedUser?.id));

      return success({
        code: OK,
        message: updated('User'),
        data: {
          token,
          email: verifiedUser?.email,
          isVerified: verifiedUser?.isVerified,
        },
        res,
      });
    }

    return error({
      code: SERVER_ERROR,
      message: 'Could not verify user. Please try again later.',
      res,
    });
  };
}
