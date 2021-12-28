import { Request, Response, NextFunction } from 'express';
import { error } from '../utils/response';
import { exists } from '../constants/responseMessages';
import { currencyService } from '../database/services';
import { BAD_REQUEST } from '../constants/statusCodes';
import { CreateCurrencyDTO } from '../dtos/createCurrency.dto';

export const checkCurrency = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { name, initials }: CreateCurrencyDTO = req.body;
  const currency = (await currencyService.findByName(name)) || (await currencyService.findByInitials(initials));
  if (currency) {
    return error({
      code: BAD_REQUEST,
      message: exists(`A currency with such a name(${name}) or initials(${initials})`),
      res,
    });
  }
  return next();
};
