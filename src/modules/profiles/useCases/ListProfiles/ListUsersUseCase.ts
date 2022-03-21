import { inject, injectable } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { Profile } from "../../typeDefs/ProfileTypeDef";

@injectable()
class ListProfilesUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute(): Promise<Profile[]> {
      const profiles = await this.profilesRepository.findAll();
      return profiles
   }

}

export { ListProfilesUseCase };