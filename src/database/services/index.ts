import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CurrencyService } from './currency.service';

export const authService = new AuthService();
export const userService = new UserService();
export const currencyService = new CurrencyService();
