import { CreateCurrencyDTO } from '../../dtos/createCurrency.dto';
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

  /**
   * find by name
   * @param { name: string}
   * @returns Currency | null
   * @memberof CurrencyService
   */
  findByName = async (name: string): Promise<Currency | null> => {
    const currency = await Currency.findOne({ name });
    return currency ?? null;
  };

  /**
   * find by initials
   * @param { initials: string}
   * @returns Currency | null
   * @memberof CurrencyService
   */
  findByInitials = async (initials: string): Promise<Currency | null> => {
    const currency = await Currency.findOne({ initials });
    return currency ?? null;
  };

  /**
   * add currency
   * @param { currencyData: CreateCurrencyDTO }
   * @returns { Currency }
   * @memberof CurrencyService
   */
  create = async (currencyData: CreateCurrencyDTO): Promise<Currency> => await Currency.create(currencyData).save();
}
