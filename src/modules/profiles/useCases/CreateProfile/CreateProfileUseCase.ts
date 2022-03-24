import { inject, injectable } from "tsyringe";
import { AuthCheck } from "../../../../shared/authCheck/AuthCheck";
import { graphqlTokenErrorHandler } from "../../../../shared/errors/GraphqlTokenErrorHandler";
import { ICreateProfileDTO } from "../../DTOs/ProfilesDTOs";
import { IProfilesRepository } from "../../repositories/IProfilesRepository";
import { CreateProfileResults } from "../../resolvers/ResolverResults";

@injectable()
class CreateProfileUseCase {

   constructor(
      @inject('ProfilesRepository')
      private readonly profilesRepository: IProfilesRepository,
   ) {}

   async execute( authHeader: string | undefined ,createProfileDTO: ICreateProfileDTO): Promise<typeof CreateProfileResults> {
      let authUser; try {authUser=AuthCheck(authHeader)}catch(err:any){return graphqlTokenErrorHandler(err)}

      const profile = this.profilesRepository.create(createProfileDTO);

      return profile;
   }
}

export { CreateProfileUseCase };