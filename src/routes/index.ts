import { IRoute } from '../interfaces/route.interface';

import { AuthRoute } from './auth.route';
import { UserRoute } from './user.route';
import { CurrencyRoute } from './currency.route';

import { authController, userController, currencyController } from '../controllers';

const authRoute = new AuthRoute(authController);
const userRoute = new UserRoute(userController);
const currencyRoute = new CurrencyRoute(currencyController);

export const routes: IRoute[] = [authRoute, userRoute, currencyRoute];
