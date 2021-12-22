import { Router } from 'express';
import { CreateUserController } from '../use-cases/create-user-controller';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/create', createUserController.handle);

export { usersRouter };
