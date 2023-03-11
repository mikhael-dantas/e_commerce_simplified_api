import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UnauthorizedError {
   @Field()
   model: string ="unauthorizedError";

   @Field()
   message: string = "Permission Denied";

   @Field()
   status: number = 401;
}
