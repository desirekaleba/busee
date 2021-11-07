import { createConnection } from 'typeorm';
import logger from '../utils/logger';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await createConnection();
    logger.info(`Database: ${conn.options.database} successly used.`);
  } catch (exception) {
    logger.error(`Database failed to connect due to ${exception}`);
  }
};
