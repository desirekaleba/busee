import { UpdateUserDTO } from '../../dtos/updateUser.dto';
import { User } from '../entity/User';

/**
 * User service
 */
export class UserService {
  /**
   * find all users
   * @returns { users: User[] }
   * @memberof UserService
   */
  findAll = async (): Promise<User[]> => {
    const users = await User.find({
      order: {
        id: 'DESC',
      },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'profileImage',
        'isAdmin',
        'isVerified',
        'createdOn',
        'updatedOn',
      ],
    });
    return users;
  };

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

  /**
   * delete
   * @param { id: number } - id of the user to remove
   * @returns deleted user
   * @memberof UserService
   */
  delete = async (id: number): Promise<User | null> => {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    return User.remove(user);
  };
}
