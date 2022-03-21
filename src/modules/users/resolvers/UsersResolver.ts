import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root } from "type-graphql";
import { User } from "../typeDefs/UserTypeDef";

import { createUserInput, usersArgs } from "../DTOs/UsersDTOs";

import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsers/ListUsersUseCase";
import { FindUserByIdUseCase } from "../useCases/FindUserById/FindUserByIdUseCase";
import { FindProfileByUserIdUseCase } from "../../profiles/useCases/FindProfileByUserId/FindProfileByUserIdUseCase";

@Resolver(User)
class UsersResolver {

   @Mutation(returns => User)
   createUser( @Arg("data") { name, email, password }: createUserInput
   ): Promise<User> {
      const createUserUseCase = new CreateUserUseCase();
      return createUserUseCase.execute({name, email, password});
   }

   @Query(returns => User)
   async user(@Arg("id") id: string) {
      const findUserByIdUseCase = new FindUserByIdUseCase();
      const user = await findUserByIdUseCase.execute(id);
      return user
   }

   @Query(returns => [User])
   async users(@Args() { skip, take }: usersArgs) {
      const listUsersUseCase = new ListUsersUseCase();
      const users = await listUsersUseCase.execute();
      return users
   }

   @FieldResolver()
   async profile (@Root() user: User) {
      const findProfileByUserIdUseCase = new FindProfileByUserIdUseCase();
      const profileFound = await findProfileByUserIdUseCase.execute( user.id );
      if (!profileFound) {
         throw new Error("Profile not found");
      }
      return profileFound;
   }
}

export { UsersResolver };
