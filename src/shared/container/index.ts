import { container } from 'tsyringe';
import { BCryptHashProvider } from '../../modules/users/providers/hash-provider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../modules/users/providers/hash-provider/models/IHashProvider';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepositories';
import { PostgresUSersRepository } from '../../modules/users/repositories/implementations/PostgresUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', PostgresUSersRepository);
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
