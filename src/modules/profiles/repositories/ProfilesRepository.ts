import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid';

import { PrismaClient } from "@prisma/client";
import { IProfilesRepository } from "./IProfilesRepository";
import { ICreateProfileDTO } from "../DTOs/ProfilesDTOs";
import { Profile } from "../typeDefs/ProfileTypeDef";

@injectable()
export class ProfilesRepository implements IProfilesRepository {
   constructor(
      @inject("PrismaClient")
      private dbCli: PrismaClient,
   ) {}

   async create({ bio, user_id }: ICreateProfileDTO): Promise<Profile> {
      const data = {
         id: uuid(),
         bio,
         user_id,
      };

      const profile = await this.dbCli.profile.create({
         data,
      });

      return profile;
   }

   async findAll(): Promise<Profile[]> {
      const profiles = await this.dbCli.profile.findMany();
      return profiles
   }
}