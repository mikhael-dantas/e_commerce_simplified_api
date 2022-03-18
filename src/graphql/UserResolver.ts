import { PrismaClient } from "@prisma/client";
import { Resolver, Query, Arg, Ctx} from "type-graphql";
import { User } from "./User";

interface Context {

}

@Resolver(User)
class UserResolver {
   @Query(returns => User)
   async User(@Arg("id") id: string) {
      return {
         id: "adgas",
         name: "mikhael",
         email: "mikhael@mikhael.com",
         password: "123456",
         created_at: new Date(),
         updated_at: new Date(),
      }
   }

   @Query(returns => [User])
   // users(@Args() { skip, take }: usersArgs) {
   async users() {
      const prisma = new PrismaClient();
      return await prisma.user.findMany();
      // return [
      //    {
      //       id: "adgas",
      //       name: "mikhael",
      //       email: "mikhael@mikhael.com",
      //       password: "123456",
      //       created_at: new Date(),
      //       updated_at: new Date(),
      //    }
      // ];
   }

   // @Mutation(returns => User)
   // @Authorized()
   // addUser(
   //    @Arg("newUserData") newUserData: NewUserInput,
   //    @Ctx("user") user: User,
   // ): Promise<User> {
   //    return this.userservice.addNew({ data: newUserData, user });
   // }

   // @Mutation(returns => Boolean)
   // @Authorized(Roles.Admin)
   // async removeUser(@Arg("id") id: string) {
   //    try {
   //       await this.userservice.removeById(id);
   //       return true;
   //    } catch {
   //       return false;
   //    }
   // }
}

export { UserResolver };