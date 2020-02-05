import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CheckInDeliveryController from './app/controllers/CheckInDeliveryController';
import CheckOutDeliveryController from './app/controllers/CheckOutDeliveryController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);
routes.post('/delivery', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.index);
routes.put('/checkin/:id', CheckInDeliveryController.update);
routes.put('/checkout/:id', CheckOutDeliveryController.update);
routes.get('/deliveryman/:id/deliveries', CheckOutDeliveryController.index);

export default routes;
