import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root } from "type-graphql";
import { container } from "tsyringe";

import { User } from "../typeDefs/UserTypeDef";
import { Profile } from "../../profiles/typeDefs/ProfileTypeDef";

import { createUserInput, usersArgs } from "../DTOs/UsersDTOs";

import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsers/ListUsersUseCase";
import { FindUserByIdUseCase } from "../useCases/FindUserById/FindUserByIdUseCase";
import { FindProfileByUserIdUseCase } from "../../profiles/useCases/FindProfileByUserId/FindProfileByUserIdUseCase";

@Resolver(User)
class UsersResolver {

   @Mutation(returns => User)
   async createUser( @Arg("data") { name, email, password }: createUserInput
   ): Promise<User> {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      return await  createUserUseCase.execute({name, email, password});
   }

   @Query(returns => User)
   async user(@Arg("id") id: string): Promise<User> {
      const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);
      const user = await findUserByIdUseCase.execute(id);
      return user
   }

   @Query(returns => [User])
   async users(@Args() { skip, take }: usersArgs): Promise<User[]> {
      const listUsersUseCase = container.resolve(ListUsersUseCase);;
      const users = await listUsersUseCase.execute();
      return users
   }

   @FieldResolver()
   async profile (@Root() user: User): Promise<Profile> {
      const findProfileByUserIdUseCase = container.resolve(FindProfileByUserIdUseCase);
      const profileFound = await findProfileByUserIdUseCase.execute( user.id );
      if (!profileFound) {
         throw new Error("Profile not found");
      }
      return profileFound;
   }
}

export { UsersResolver };
