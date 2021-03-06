import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler, checkEmail } from '../middlewares';
import {
  signup as signupValidator,
  signin as signinValidator,
  verifyAccount as verifyAccountValidator,
  sendVerificationCode as sendVerificationCodeValidator,
} from '../validators';

export class AuthRoute implements IRoute {
  public path = '/auth';

  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/signup`)
      .post(signupValidator, asyncHandler(checkEmail), asyncHandler(this.authController.signup));

    this.router
      .route(`${this.path}/sendVerificationCode`)
      .post(sendVerificationCodeValidator, asyncHandler(this.authController.sendVerificationCode));

    this.router
      .route(`${this.path}/verify`)
      .post(verifyAccountValidator, asyncHandler(this.authController.verifyAccount));

    this.router.route(`${this.path}/signin`).post(signinValidator, asyncHandler(this.authController.signin));
  }
}
