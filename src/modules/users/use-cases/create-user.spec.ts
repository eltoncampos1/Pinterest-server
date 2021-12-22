import { MissimParamError } from '../../../shared/errors';
import { AppError } from '../../../shared/errors/app-error';
import { ICreateUserDTO } from '../dtos';
import { FakeHashProvider } from '../providers/hash-provider/fake/fake-hash-provider';
import { UsersRepository } from '../repositories/ImMemmory/UsersRepository';
import { CreateUserUseCase } from './create-user';

let usersRepository: UsersRepository;
let createUserUsecase: CreateUserUseCase;
let hashProvider: FakeHashProvider;

describe('Create User', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepository();
    createUserUsecase = new CreateUserUseCase(usersRepository, hashProvider);
  });

  it('should not be able to create an user with no email', async () => {
    const user = {
      password: 'any_password',
      age: 18,
    };

    expect(async () => {
      const result = await createUserUsecase.execute(user as ICreateUserDTO);

      console.log(result);
    }).rejects.toBeInstanceOf(MissimParamError);
  });
  it('should not be able to create an user with no password', async () => {
    const user = {
      email: 'any_email',
      age: 18,
    };

    expect(async () => {
      const result = await createUserUsecase.execute(user as ICreateUserDTO);

      console.log(result);
    }).rejects.toBeInstanceOf(MissimParamError);
  });

  it('should not be able to create an user with no age', async () => {
    const user = {
      email: 'any_email',
      password: 'any_password',
    };

    expect(async () => {
      const result = await createUserUsecase.execute(user as ICreateUserDTO);

      console.log(result);
    }).rejects.toBeInstanceOf(MissimParamError);
  });

  it('should not be able to create an user age is < 18', async () => {
    const user = {
      email: 'any_email',
      password: 'any_password',
      age: 14,
    };

    expect(async () => {
      const result = await createUserUsecase.execute(user as ICreateUserDTO);

      console.log(result);
    }).rejects.toBeInstanceOf(AppError);
  });
});
