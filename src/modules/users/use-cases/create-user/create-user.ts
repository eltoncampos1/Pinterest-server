/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { MissimParamError, AppError } from '../../../../shared/errors';
import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../dtos';
import { IHashProvider } from '../../providers/hash-provider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ email, password, age }: ICreateUserDTO): Promise<User | undefined> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)



    const requiredParams = [password, email, age];


    for (const param of requiredParams) {
      if (!param) {
        throw new MissimParamError(String(param))
      }
    }

    if (userAlreadyExists) {
      throw new AppError('Email already registered in our system')
    }

    if (age < 18) {
      throw new AppError('you must be over 18 to create an account.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({ email, password: hashedPassword, age });

    return user;
  }
}
