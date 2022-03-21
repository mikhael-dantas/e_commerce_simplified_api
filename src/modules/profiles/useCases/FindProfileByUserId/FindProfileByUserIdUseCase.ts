import { container } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import { Profile } from "../../typeDefs/ProfileTypeDef";


class FindProfileByUserIdUseCase {
   private readonly profilesRepository: IProfilesRepository;

   constructor() {
      this.profilesRepository = container.resolve(ProfilesRepository);
   }

   async execute( user_id: string ): Promise<Profile> {
      const profile = await this.profilesRepository.findByUserId(user_id);
      if (!profile) {
         throw new Error("Profile not found");
      }
      return profile
   }

}

export { FindProfileByUserIdUseCase };