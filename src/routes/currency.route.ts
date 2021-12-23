import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { CurrencyController } from '../controllers/currency.controller';
import { asyncHandler } from '../middlewares';

export class CurrencyRoute implements IRoute {
  public path = '/currency';

  public router = Router();

  constructor(private readonly currencyController: CurrencyController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`).get(asyncHandler(this.currencyController.findAll));
  }
}
