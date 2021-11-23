import jwt from 'jsonwebtoken';
import secrets from './secrets';

const { JWT_SECRET_KEY } = secrets;

/**
 * generate
 * @param {id: number}
 * @returns {token: string}
 */
export const generate = (id: number): string => jwt.sign({ id }, JWT_SECRET_KEY as string, { expiresIn: '10d' });

/**
 * decode
 * @param {token: string}
 * @returns {decodedToken}
 */
export const decode = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY as string);
  } catch (error) {
    return error;
  }
};
