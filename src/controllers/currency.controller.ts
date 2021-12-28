import { Request, Response } from 'express';
import { created } from '../constants/responseMessages';
import { CREATED, OK } from '../constants/statusCodes';
import { CurrencyService } from '../database/services/currency.service';
import { CreateCurrencyDTO } from '../dtos/createCurrency.dto';
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
   * @returns currencies: Currency[]
   * @memberof CurrencyController
   */
  findAll = async (req: Request, res: Response): Promise<Response> => {
    const currencies = await this.currencyService.findAll();
    return success({
      code: OK,
      message: `Found ${currencies.length} currency(ies).`,
      data: currencies,
      res,
    });
  };

  /**
   * create currency
   * @param req: Request
   * @param res: Response
   * @returns currency: Currency
   * @memberof CurrencyController
   */
  create = async (req: Request, res: Response): Promise<Response> => {
    const currencyData: CreateCurrencyDTO = req.body;
    const currency = await this.currencyService.create({ ...currencyData });

    return success({
      code: CREATED,
      message: created('Currency'),
      data: currency,
      res,
    });
  };
}
