import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MissingTokenErrorTypeDef {
   @Field()
   message: string = "You need to Login";

   @Field()
   status: number = 401;
}
