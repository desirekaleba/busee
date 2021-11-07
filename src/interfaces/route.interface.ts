import { Router } from 'express';

export interface IRoute {
  path: String;
  router: Router;
}
