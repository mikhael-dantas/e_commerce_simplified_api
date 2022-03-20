import { container } from "tsyringe";
import { ICreateProfileDTO } from "../../DTOs/ProfilesDTOs";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";

class CreateProfileUseCase {
   private readonly profilesRepository: IProfilesRepository;
   constructor() {
      this.profilesRepository = container.resolve(ProfilesRepository);
   }

   async execute(createProfileDTO: ICreateProfileDTO) {
      const profile = this.profilesRepository.create(createProfileDTO);

      return profile;
   }
}

export { CreateProfileUseCase };