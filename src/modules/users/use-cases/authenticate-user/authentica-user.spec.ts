import { AppError } from '../../../../shared/errors';
import { FakeHashProvider, FakeTokenProvider } from '../../providers';
import { UsersRepository } from '../../repositories/ImMemmory/UsersRepository';
import { CreateUserUseCase } from '../create-user';
import { AuthenticateUserUseCase } from './authenticate-user';

let tokenProvider: FakeTokenProvider;
let hashProvider: FakeHashProvider;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUseCase: AuthenticateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    tokenProvider = new FakeTokenProvider();
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    authenticateUseCase = new AuthenticateUserUseCase(usersRepository, hashProvider, tokenProvider);
  });

  it('should not be able to authenticate user with wrong email', async () => {
    const user = {
      email: 'any_email@email.com',
      password: 'any_password',
      age: 18,
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'wrong_email@email.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const user = {
      email: 'any_email@email.com',
      password: 'any_password',
      age: 18,
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUseCase.execute({
        email: user.email,
        password: 'wrong_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate an user ', async () => {
    const user = {
      email: 'any_email@email.com',
      password: 'any_password',
      age: 18,
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });
});
