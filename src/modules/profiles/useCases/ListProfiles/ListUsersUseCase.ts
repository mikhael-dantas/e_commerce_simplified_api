import { inject, injectable } from "tsyringe";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { SearchProfilesResults } from "../../resolvers/ResolverResults";
import { Profile } from "../../typeDefs/ProfileTypeDef";

@injectable()
class ListProfilesUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute(): Promise<typeof SearchProfilesResults[]> {
      const profiles = await this.profilesRepository.findAll();
      return profiles
   }

}

export { ListProfilesUseCase };