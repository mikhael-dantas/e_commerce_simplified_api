import { inject, injectable } from "tsyringe";
import { ResourceNotFoundErrorTypeDef } from "../../../../shared/errors/GraphqlErrorDefs/ResourceNotFoundError";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { SearchProfileResults } from "../../resolvers/ResolverResults";

@injectable()
class FindProfileByUserIdUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute( user_id: string ): Promise<typeof SearchProfileResults> {
      const profile = await this.profilesRepository.findByUserId(user_id);
      if (!profile) {
         return new ResourceNotFoundErrorTypeDef()
      }
      return profile
   }

}

export { FindProfileByUserIdUseCase };