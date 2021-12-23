import { Request, Response } from 'express';
import { OK } from '../constants/statusCodes';
import { CurrencyService } from '../database/services/currency.service';
import { success } from '../utils/response';

/**
 * User controller
 */
export class CurrencyController {
  /**
   * constructor
   * @param { currencyService: CurrencyService } - currency service class
   * @memberof CurrencyService
   */
  constructor(private currencyService: CurrencyService) {}

  /**
   * find all currencies
   * @param req: Request
   * @param res: Response
   * @returns currencies: Currencies[]
   */
  findAll = async (req: Request, res: Response): Promise<Response> => {
    const currencies = await this.currencyService.findAll();
    return success({
      code: OK,
      message: `Found ${currencies.length} user(s).`,
      data: currencies,
      res,
    });
  };
}
