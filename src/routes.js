import { Router } from 'express';
import UserConstroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserConstroller.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);

export default routes;
