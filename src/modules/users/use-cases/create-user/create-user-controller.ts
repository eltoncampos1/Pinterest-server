/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '.';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, age, name } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ email, password, age, name });

    const result = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };

    return response.status(201).json(result);
  }
}
