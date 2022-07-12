import { inject, injectable } from "tsyringe";
import { AuthCheck } from "../../../../shared/authCheck/AuthCheck";
import { UnauthorizedTokenErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/UnauthorizedTokenError";
import { graphqlTokenErrorHandler } from "../../../../shared/graphql/GraphqlTokenErrorHandler";
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
      //authentication
      let authUser; try {authUser=AuthCheck(authHeader)}catch(err:any){return graphqlTokenErrorHandler(err)}
      //authorization
      if (createProfileDTO.user_id !== authUser.user.id) {return new UnauthorizedTokenErrorTypeDef}

      const profile = this.profilesRepository.create(createProfileDTO);

      return profile;
   }
}

export { CreateProfileUseCase };