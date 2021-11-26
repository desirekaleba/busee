import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler, checkEmail } from '../middlewares';
import { signup as signupValidator } from '../validators';

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
  }
}
