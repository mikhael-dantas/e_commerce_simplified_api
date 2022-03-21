import { inject, injectable } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { Profile } from "../../typeDefs/ProfileTypeDef";


@injectable()
class FindProfileByIdUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute( id: string ): Promise<Profile> {
      const profile = await this.profilesRepository.findById(id);
      if (!profile) {
         throw new Error("Profile not found");
      }
   
      return profile
   }

}

export { FindProfileByIdUseCase };