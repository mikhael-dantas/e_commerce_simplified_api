import { CategoriesRepository } from './../../modules/categories/repositories/CategoriesRepository';
import { ICategoriesRepository } from './../../modules/categories/repositories/ICategoriesRepository';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '../../modules/products/repositories/ProductsRepository';
import { IManagersRepository } from '../../modules/managers/repositories/IManagersRepository';
import { ManagersRepository } from '../../modules/managers/repositories/ManagersRepository';

// import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
// import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

// import { IProfilesRepository } from '../../modules/profiles/repositories/IProfilesRepository';
// import { ProfilesRepository } from '../../modules/profiles/repositories/ProfilesRepository';

class GlobalPrisma extends PrismaClient {
   constructor() { super({ log: [ "query" ] }) }
}

container.registerSingleton<GlobalPrisma>(
   "PrismaClient",
   GlobalPrisma,
);

// container.registerSingleton<IUsersRepository>(
//    "UsersRepository",
//    UsersRepository,
// );

container.registerSingleton<IProductsRepository>(
   "ProductsRepository",
   ProductsRepository,
);

container.registerSingleton<IManagersRepository>(
   "ManagersRepository",
   ManagersRepository,
);

container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository,
);

// container.registerSingleton<IProfilesRepository>(
//    "ProfilesRepository",
//    ProfilesRepository,
// );