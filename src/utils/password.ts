import bcrypt from 'bcrypt';

/**
 * hash
 * @param { password: string }
 * @returns { hashedPassword: string}
 */
export const hash = (password: string): string => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * compare
 * @param {password: string}
 * @param {hashedPassword: string}
 * @returns {state: boolean}
 */
export const compare = (password: string, hashedPassword: string): boolean =>
  bcrypt.compareSync(password, hashedPassword);
