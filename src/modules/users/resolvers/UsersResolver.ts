import { Resolver, Query, Arg, Ctx, Mutation, InputType, Args} from "type-graphql";
import { User } from "../typeDefs/UserTypeDef";

import { CreateUserUserCase } from "../useCases/CreateUser/CreateUserUseCase";
import { ListUsersUseCase } from "../useCases/ListUsers/ListUsersUseCase";

@Resolver(User)
class UserResolver {

   @Mutation(returns => User)
   createUser(
      @Arg("name") name: string,
      @Arg("email") email: string,
      @Arg("password") password: string,
   ): Promise<User> {
      const createUserUseCase = new CreateUserUserCase();
      return createUserUseCase.execute({name, email, password});
   }

   @Query(returns => [User])
   // async users(@Arg("skip") skip: number, @Arg("take") take: number) {
   async users() {
      const listUsersUseCase = new ListUsersUseCase();
      const users = await listUsersUseCase.execute();
      return users
   }
}

export { UserResolver };
