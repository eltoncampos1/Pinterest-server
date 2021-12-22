import { Router } from 'express';
import { AuthenticateUserController } from '../use-cases/authenticate-user/authenticate-user-controller';

const authenticateRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post('/', authenticateUserController.handle);

export { authenticateRouter };
