import { User } from '../entity/User';
import { CreateUserDTO } from '../../dtos/createUser.dto';

/**
 * Auth Service
 */
export class AuthService {
  /**
   * signup
   * @param { userData }
   * @returns { User }
   * @memberOf UserService
   */
  signup = async (userData: CreateUserDTO): Promise<User> => await User.create(userData).save();
}
