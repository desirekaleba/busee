import { User } from '../entity/User';
import { CreateUserDTO } from '../../dtos/createUser.dto';
import { SigninUserDTO } from '../../dtos/signinUser.dto';
import { userService } from '.';

/**
 * Auth Service
 */
export class AuthService {
  /**
   * signup
   * @param { userData }
   * @returns { User }
   * @memberOf AuthService
   */
  signup = async (userData: CreateUserDTO): Promise<User> => await User.create(userData).save();

  /**
   * signin
   * @param { userSigninData: SigninUserDTO }
   * @returns { User }
   * @memberOf AuthService
   */
  signin = async (signinData: SigninUserDTO): Promise<User | null> => await userService.findByEmail(signinData.email);
}
