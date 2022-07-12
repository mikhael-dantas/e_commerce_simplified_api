import { inject, injectable } from "tsyringe";
import { AuthCheck } from "../../../../shared/authCheck/AuthCheck";

import { IUsersRepository } from "../../repositories/IUsersRepository";

import { User } from "../../typeDefs/UserTypeDef";

import { FieldsToSearchUser } from "../../DTOs/UsersDTOs";
import { SearchUserResults } from "../../resolvers/ResolverResults"

import { ExpiredTokenErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../../shared/graphql/GraphqlErrorDefs/ResourceNotFoundError";
import { graphqlTokenErrorHandler } from "../../../../shared/graphql/GraphqlTokenErrorHandler";

@injectable()
class FindUserUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute(authHeader: string | undefined, field: FieldsToSearchUser, value: string ): Promise<typeof SearchUserResults> {
      let authUser; try {authUser=AuthCheck(authHeader)}catch(err:any){return graphqlTokenErrorHandler(err)}
      

      if (field === 'id') {
         const user = await this.usersRepository.findById(value);
         if (!user) {
            return new ResourceNotFoundErrorTypeDef()
         }
         return Object.assign(new User, user);
      }

      if (field === 'email') {
         const user = await this.usersRepository.findByEmail(value);
         if (!user) {
            return new ResourceNotFoundErrorTypeDef()
         }
         return Object.assign(new User, user);
      }
      return new ResourceNotFoundErrorTypeDef()
   }

}

export { FindUserUseCase }; 