export interface UpdateUserDTO {
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  password?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}
