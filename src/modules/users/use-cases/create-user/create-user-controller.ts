import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '.';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, age } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ email, password, age });

    return response.status(201).json({ id: user?.id, email, age });
  }
}
