import { container } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";

class ListProfilesUseCase {
   private readonly profilesRepository: IProfilesRepository;

   constructor() {
      this.profilesRepository = container.resolve(ProfilesRepository);
   }

   async execute() {
      const profiles = await this.profilesRepository.findAll();
      return profiles
   }

}

export { ListProfilesUseCase };