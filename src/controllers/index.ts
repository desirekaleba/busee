import { authService, userService, currencyService } from '../database/services';
import { twilioService } from '../plugins/twilio';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { CurrencyController } from './currency.controller';

export const authController = new AuthController(authService, twilioService, userService);
export const userController = new UserController(userService);
export const currencyController = new CurrencyController(currencyService);
