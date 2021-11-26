import { User } from '../entity/User';

/**
 * User service
 */
export class UserService {
  /**
   * findByEmail
   * @param { email: string}
   * @returns User | null
   */
  findByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ email });
    return user ?? null;
  };
}
