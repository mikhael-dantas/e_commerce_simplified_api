import { inject, injectable } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { Profile } from "../../typeDefs/ProfileTypeDef";

@injectable()
class FindProfileByUserIdUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute( user_id: string ): Promise<Profile> {
      const profile = await this.profilesRepository.findByUserId(user_id);
      if (!profile) {
         throw new Error("Profile not found");
      }
      return profile
   }

}

export { FindProfileByUserIdUseCase };