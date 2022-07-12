import { inject, injectable } from "tsyringe";
import { ResourceNotFoundErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/ResourceNotFoundError";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { SearchProfileResults } from "../../resolvers/ResolverResults";
import { Profile } from "../../typeDefs/ProfileTypeDef";


@injectable()
class FindProfileByIdUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute( id: string ): Promise<typeof SearchProfileResults> {
      const profile = await this.profilesRepository.findById(id);
      if (!profile) {
         return new ResourceNotFoundErrorTypeDef()
      }
   
      return profile
   }

}

export { FindProfileByIdUseCase };