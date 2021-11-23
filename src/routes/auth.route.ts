import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler } from '../middlewares/asyncHandler';
import { userValidator } from '../validators/user.validator';

export class AuthRoute implements IRoute {
  public path = '/auth';

  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/signup`).post(userValidator.signup, asyncHandler(this.authController.signup));
  }
}
