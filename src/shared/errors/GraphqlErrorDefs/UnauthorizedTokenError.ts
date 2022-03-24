import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UnauthorizedTokenErrorTypeDef {
   @Field()
   unauthorizedToken: boolean = true;

   @Field()
   message: string = "Permission Denied";

   @Field()
   status: number = 401;
}
