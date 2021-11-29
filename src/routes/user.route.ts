import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { UserController } from '../controllers/user.controller';
import { asyncHandler, checkAuthentication } from '../middlewares';
import { getByEmail as getByEmailValidator, update as updateValidator } from '../validators';

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

    this.router.route(`${this.path}/:id`).get(asyncHandler(this.userController.getById));

    this.router
      .route(`${this.path}/:id/update`)
      .post(updateValidator, asyncHandler(checkAuthentication), asyncHandler(this.userController.updateById));
  }
}
