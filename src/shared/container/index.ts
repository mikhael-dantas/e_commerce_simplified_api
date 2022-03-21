import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

import { IProfilesRepository } from '../../modules/profiles/repositories/IProfilesRepository';
import { ProfilesRepository } from '../../modules/profiles/repositories/ProfilesRepository';

class GlobalPrisma extends PrismaClient {
   constructor() { super({ log: [ "query" ] }) }
}

container.registerSingleton<GlobalPrisma>(
   "PrismaClient",
   GlobalPrisma,
);

container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UsersRepository,
);

container.registerSingleton<IProfilesRepository>(
   "ProfilesRepository",
   ProfilesRepository,
);