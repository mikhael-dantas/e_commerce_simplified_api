import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid';

import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../DTOs/UsersDTOs";
import { IUsersRepository } from "./IUsersRepository";
import { User } from "../typeDefs/UserTypeDef";

@injectable()
export class UsersRepository implements IUsersRepository {
   constructor(
      @inject("PrismaClient")
      private dbCli: PrismaClient,
   ) {}

   async create({ name, email, password }: ICreateUserDTO): Promise<User> {
      const data = {
         id: uuid(),
         name,
         email,
         password
      };

      const user = await this.dbCli.user.create({
         data,
      });

      return user as User;
   }

   async findAll(): Promise<User[]> {
      const users = await this.dbCli.user.findMany();
      return users as User[];
   }

   async findById(user_id: string): Promise<User | null> {
      const user = await this.dbCli.user.findUnique({
         where: {
            id: user_id
         }
      });

      return user as User | null;
   }
}