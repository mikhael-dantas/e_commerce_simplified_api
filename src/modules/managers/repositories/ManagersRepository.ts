import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { Manager } from "../typeDefs/Manager";
import { IManagersRepository } from "./IManagersRepository";


@injectable()
export class ManagersRepository implements IManagersRepository {
   constructor(
      @inject('PrismaClient')
      private prisma: PrismaClient
   ) {}

   async create(name: string, email: string, password: string): Promise<Manager> {
      return await this.prisma.manager.create({
         data: {
            id: uuidv4(),
            name,
            email,
            password,
         },
      });
   }
}