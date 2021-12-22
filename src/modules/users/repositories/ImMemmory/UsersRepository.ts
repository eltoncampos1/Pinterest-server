import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../IUsersRepositories';

export class UsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({ email, password, age, name }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User();

    Object.assign(user, {
      email,
      password,
      age,
      name: email.split('@')[0],
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
