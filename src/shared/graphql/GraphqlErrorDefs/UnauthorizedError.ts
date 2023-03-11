import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UnauthorizedError {
   constructor(
      message?: string
   ) {
      if (message) {
         this.message = message
      }
   }


   @Field()
   model: string ="unauthorizedError";

   @Field()
   message: string = "Permission Denied";

   @Field()
   status: number = 401;
}
