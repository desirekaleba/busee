import { Request, Response } from 'express';
import { notFound } from '../constants/responseMessages';
import { NOT_FOUND, OK } from '../constants/statusCodes';
import { UserService } from '../database/services/user.service';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { error, success } from '../utils/response';

/**
 * User controller
 */
export class UserController {
  /**
   * constructor
   * @param { userService: UserService } - user service class
   * @memberof UserController
   */
  constructor(private userService: UserService) {}

  /**
   * get user by email
   * @param { req: Request }
   * @param { res: Response }
   * @returns { User } - user
   * @memberof UserController
   */
  getByEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return error({
        code: NOT_FOUND,
        message: notFound('User'),
        res,
      });
    }
    return success({
      code: OK,
      message: 'user found.',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        createdOn: user.createdOn,
      },
      res,
    });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user = await this.userService.findById(Number(id));
    if (!user) {
      return error({
        code: NOT_FOUND,
        message: notFound('User'),
        res,
      });
    }
    return success({
      code: OK,
      message: 'user found.',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        createdOn: user.createdOn,
      },
      res,
    });
  };

  updateById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const newData: UpdateUserDTO = req.body;

    const user = await this.userService.findById(Number(id));

    if (!user) {
      return error({
        code: NOT_FOUND,
        message: notFound('User'),
        res,
      });
    }
    const updatedUser = await this.userService.update(user.id, newData);

    return success({
      code: OK,
      message: 'User updated.',
      data: {
        id: updatedUser?.id,
        email: updatedUser?.email,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        profileImage: updatedUser?.profileImage,
        isAdmin: user.isAdmin,
        isVerified: updatedUser?.isVerified,
        createdOn: updatedUser?.createdOn,
        updatedOn: updatedUser?.updatedOn,
      },
      res,
    });
  };
}
