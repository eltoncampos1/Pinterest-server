import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepositories';

export class PostgresUSersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, age, email, password }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.repository.create({ id, age, email, password });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }
}
