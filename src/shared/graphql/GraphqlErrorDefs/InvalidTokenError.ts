import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class InvalidTokenErrorTypeDef {
   @Field()
   model: string ="invalidTokenErrorTypeDef";

   @Field()
   message: string = "Invalid token";

   @Field()
   location: string = "Authorization Header - Bearer Token";

   @Field()
   status: number = 400;
}
