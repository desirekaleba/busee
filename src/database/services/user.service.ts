import { UpdateUserDTO } from '../../dtos/updateUser.dto';
import { User } from '../entity/User';

/**
 * User service
 */
export class UserService {
  /**
   * findByEmail
   * @param { email: string}
   * @returns User | null
   * @memberof UserService
   */
  findByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ email });
    return user ?? null;
  };

  /**
   * findById
   * @param { id: number } - user id
   * @returns User | null
   * @memberof UserService
   */
  findById = async (id: number): Promise<User | null> => {
    const user = await User.findOne({ id });
    return user ?? null;
  };

  /**
   * update
   * @param { id: number } - user id
   * @param { updatedInfo: UpdateUserDTO } - updatedUser info
   * @returns { User | null} - updated user
   * @memberof UserService
   */
  update = async (id: number, updatedInfo: UpdateUserDTO): Promise<User | null> => {
    const user = await this.findById(id);
    if (user) {
      User.merge(user, updatedInfo);
      const updatedUser = User.save(user);
      return updatedUser;
    }
    return null;
  };
}
