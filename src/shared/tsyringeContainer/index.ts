import { CategoriesRepository } from './../../modules/categories/repositories/CategoriesRepository';
import { ICategoriesRepository } from './../../modules/categories/repositories/ICategoriesRepository';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import mongoose from 'mongoose';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

class GlobalPrisma extends PrismaClient {
   constructor() { super({ log: [ "query" ] }) }
}
class GlobalRedis extends Redis {
   constructor() {
      super({
            host: 'redis',
            port: 6379,
      });
   }
}
class GlobalMongoDB extends mongoose.Mongoose {
   constructor() {
      super();
      this.connect('mongodb://mongodb:27017/ecommerceapi');
      this.connection.on('error', (err) => {
         console.log(err);
      })
      this.connection.once('open', () => {
         console.log('Connected to MongoDB');
      })
   }
}


container.registerSingleton<GlobalPrisma>("PrismaClient", GlobalPrisma);
container.registerSingleton<GlobalRedis>("Redis", GlobalRedis);
container.registerSingleton<GlobalMongoDB>("MongoDB", GlobalMongoDB);

container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository,
);

container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UsersRepository,
);