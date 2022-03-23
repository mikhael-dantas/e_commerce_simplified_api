import { inject, injectable } from "tsyringe";
import { AuthCheck } from "../../../../shared/authCheck/AuthCheck";
import { ResourceNotFoundErrorTypeDef } from "../../../../shared/errors/GraphqlErrorDefs/ResourceNotFoundError";
import { FieldsToSearchUser } from "../../DTOs/UsersDTOs";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { SearchUserResults } from "../../resolvers/ResolverResults"
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class FindUserUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute(authorizationHeader: string | undefined, field: FieldsToSearchUser, value: string ): Promise<typeof SearchUserResults> {
      const authenticateUser = AuthCheck(authorizationHeader)
      if (authenticateUser.status !== 200) { return  authenticateUser }

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