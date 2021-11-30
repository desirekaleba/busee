import { Request, Response } from 'express';
import { notFound } from '../constants/responseMessages';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';
import { UserService } from '../database/services/user.service';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { IRequestWithAuth } from '../interfaces/requestWithAuth.interface';
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

  /**
   * get user by id
   * @param { req: Request }
   * @param { res: Response }
   * @returns { User } - user
   * @memberof UserController
   */
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

  /**
   * get current user
   * @param { req: IRequestWithAuth }
   * @param { res: Response }
   * @returns { User } - current user
   * @memberof UserController
   */
  getCurrent = async (req: IRequestWithAuth, res: Response): Promise<Response> => {
    const user = req.currentUser;
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

  /**
   * update user by id
   * @param { req: Request }
   * @param { res: Response }
   * @returns { User } - updated user
   * @memberof UserController
   */
  updateById = async (req: IRequestWithAuth, res: Response): Promise<Response> => {
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

    if (req.currentUser.id !== Number(id)) {
      return error({
        code: UNAUTHORIZED,
        message: `Oups! Can't help you with that. Please make sure you're updating your details.`,
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
        isAdmin: updatedUser?.isAdmin,
        isVerified: updatedUser?.isVerified,
        createdOn: updatedUser?.createdOn,
        updatedOn: updatedUser?.updatedOn,
      },
      res,
    });
  };
}
