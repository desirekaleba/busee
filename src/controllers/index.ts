import { authService, userService } from '../database/services';
import { twilioService } from '../plugins/twilio';
import { AuthController } from './auth.controller';

export const authController = new AuthController(authService, twilioService, userService);
