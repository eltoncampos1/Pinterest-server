import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MissimParamError } from '../../../shared/errors';
import { CreateUserUseCase } from './create-user';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, age } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ email, password, age });

    return response.status(201).json(user);
  }
}
