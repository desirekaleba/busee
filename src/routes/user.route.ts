import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { UserController } from '../controllers/user.controller';
import { asyncHandler } from '../middlewares';
import { getByEmail as getByEmailValidator } from '../validators';

export class UserRoute implements IRoute {
  public path = '/user';

  public router = Router();

  constructor(private readonly userController: UserController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/getByEmail`)
      .post(getByEmailValidator, asyncHandler(this.userController.getByEmail));
  }
}
