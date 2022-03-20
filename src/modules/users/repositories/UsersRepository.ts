import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid';

import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../DTOs/DTOs";
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

      return user;
   }

   async findAll(): Promise<User[]> {
      const users = await this.dbCli.user.findMany();
      return users
   }
}