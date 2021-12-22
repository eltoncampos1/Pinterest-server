import { ICreateUserDTO } from '../dtos';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
