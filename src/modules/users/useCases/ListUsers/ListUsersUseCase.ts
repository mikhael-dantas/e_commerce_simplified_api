import { inject, injectable } from "tsyringe";
import { AuthCheck } from "../../../../shared/authCheck/AuthCheck";
import { graphqlTokenErrorHandler } from "../../../../shared/errors/GraphqlTokenErrorHandler";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { SearchUsersResults } from "../../resolvers/ResolverResults";
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class ListUsersUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute( authHeader: string | undefined ): Promise<(typeof SearchUsersResults)[]> {
      let authUser; try {authUser=AuthCheck(authHeader)}catch(err:any){return [graphqlTokenErrorHandler(err)]}

      const users = await this.usersRepository.findAll();
      return users
   }

}

export { ListUsersUseCase };