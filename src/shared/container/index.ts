import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

class GlobalPrisma extends PrismaClient {
   constructor() { super({ log: [ "query" ] }) }
}

container.registerSingleton<GlobalPrisma>(
   "PrismaClient",
   GlobalPrisma,
);
