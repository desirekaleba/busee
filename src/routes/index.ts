import { IRoute } from '../interfaces/route.interface';

import { AuthRoute } from './auth.route';
import { UserRoute } from './user.route';

import { authController, userController } from '../controllers';

const authRoute = new AuthRoute(authController);
const userRoute = new UserRoute(userController);

export const routes: IRoute[] = [authRoute, userRoute];
