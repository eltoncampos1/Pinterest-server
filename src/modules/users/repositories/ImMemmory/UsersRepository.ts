import { ICreateUserDTO } from "modules/users/dtos";
import { User } from "modules/users/entities/User";
import { IUsersRepository } from "../IUsersRepositories";

export class UsersRepository implements IUsersRepository {
  users: User[] = []

  async create({ id, email, password, age }: ICreateUserDTO): Promise<User | undefined> {

    const user = new User()

    Object.assign(user, {
      id,
      email,
      password,
      age
    })

    this.users.push(user)

    return user

  }
}