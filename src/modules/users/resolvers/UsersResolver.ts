import { Resolver, Query, Arg, Mutation, Args } from "type-graphql";
import { User } from "../typeDefs/UserTypeDef";

import { createUserInput, usersArgs } from "../DTOs/UsersDTOs";

import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsers/ListUsersUseCase";

@Resolver(User)
class UserResolver {

   @Mutation(returns => User)
   createUser( @Arg("data") { name, email, password }: createUserInput
   ): Promise<User> {
      const createUserUseCase = new CreateUserUseCase();
      return createUserUseCase.execute({name, email, password});
   }

   @Query(returns => [User])
   async users(@Args() { skip, take }: usersArgs) {
      const listUsersUseCase = new ListUsersUseCase();
      const users = await listUsersUseCase.execute();
      return users
   }
}

export { UserResolver };
