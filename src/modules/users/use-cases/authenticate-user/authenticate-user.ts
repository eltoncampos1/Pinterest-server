/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { ITokenProvider } from '../../providers/token/models/ITokenProvider';
import { AppError } from '../../../../shared/errors';
import { IHashProvider } from '../../providers/hash-provider/models/IHashProvider'
import { IUsersRepository } from '../../repositories/IUsersRepositories';

type IRequest = {
  email: string;
  password: string
}

type IReturn = {
  user: {
    email: string;
  },
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IReturn> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = this.tokenProvider.generateToken(String(process.env.TOKEN_SECRET), { subject: String(user.id), expiresIn: '1d' })

    return {
      user: {
        email: user.email
      },
      token
    }
  }
}
