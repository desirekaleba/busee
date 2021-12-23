import { Currency } from '../entity/Currency';

/**
 * User service
 */
export class CurrencyService {
  /**
   * find all currencies
   * @returns { currencies: Currency[] }
   * @memberof CurrencyService
   */
  findAll = async (): Promise<Currency[]> => {
    const currencies = await Currency.find({});
    return currencies;
  };
}
