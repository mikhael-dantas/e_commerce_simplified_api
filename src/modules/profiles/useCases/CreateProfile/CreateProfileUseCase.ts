import { inject, injectable } from "tsyringe";
import { ICreateProfileDTO } from "../../DTOs/ProfilesDTOs";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { Profile } from "../../typeDefs/ProfileTypeDef";

@injectable()
class CreateProfileUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute(createProfileDTO: ICreateProfileDTO): Promise<Profile> {
      const profile = this.profilesRepository.create(createProfileDTO);

      return profile;
   }
}

export { CreateProfileUseCase };