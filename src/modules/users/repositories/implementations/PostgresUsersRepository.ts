import { ICreateUserDTO } from "modules/users/dtos";
import { User } from "modules/users/entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepositories";

export class PostgresUSersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ id, age, email, password }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.repository.create({ id, age, email, password })

    await this.repository.save(user)

    return user
  }
}