import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepositories';
import { PostgresUSersRepository } from '../../modules/users/repositories/implementations/PostgresUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', PostgresUSersRepository);
