import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root, Ctx } from "type-graphql";
import { container } from "tsyringe";

import { User } from "../typeDefs/UserTypeDef";
import { Profile } from "../../profiles/typeDefs/ProfileTypeDef";

import { 
   CreateUserResults,
   SearchUserProfileResults,
   SearchUserResults,
   SearchUsersResults
} from "./ResolverResults";

import { IContext } from "../../../app";
import { createUserInput, FieldsToSearchUser, usersArgs } from "../DTOs/UsersDTOs";

import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsers/ListUsersUseCase";
import { FindUserUseCase } from "../useCases/FindUser/FindUserUseCase";
import { FindProfileByUserIdUseCase } from "../../profiles/useCases/FindProfileByUserId/FindProfileByUserIdUseCase";


@Resolver(User)
class UsersResolver {

   @Mutation(returns => CreateUserResults)
   async createUser(
      @Arg("data") { name, email, password }: createUserInput
   ): Promise<typeof CreateUserResults> {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      return await  createUserUseCase.execute({name, email, password});
   }

   @Query(returns => SearchUserResults)
   async user(
      @Arg("fieldValue") fieldValue: string,
      @Arg("fieldToSearch", type => FieldsToSearchUser) fieldToSearch: FieldsToSearchUser,
      @Ctx() context: IContext

   ): Promise<typeof SearchUserResults> {
      const authorizationHeader = context.req.headers.authorization;

      const findUserUseCase = container.resolve(FindUserUseCase);
      const user = await findUserUseCase.execute(authorizationHeader, fieldToSearch, fieldValue);
      return user;
   }

   @Query(returns => [SearchUsersResults])
   async users(
      @Args() { skip, take }: usersArgs
   ): Promise<typeof SearchUsersResults[]> {
      // 
      // TODO: add pagination
      // TODO: add error handling for everything
      const listUsersUseCase = container.resolve(ListUsersUseCase);;
      const users = await listUsersUseCase.execute();
      return users
   }

   @FieldResolver( returns => SearchUserProfileResults )
   async profile (
      @Root() user: User
   ): Promise<typeof SearchUserProfileResults> {
      const findProfileByUserIdUseCase = container.resolve(FindProfileByUserIdUseCase);
      const profileFound = await findProfileByUserIdUseCase.execute( user.id );
      return profileFound;
   }
}

export { UsersResolver };
