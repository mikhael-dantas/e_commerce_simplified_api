import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ExpiredTokenErrorTypeDef {
   @Field()
   model: string ="expiredTokenErrorTypeDef";

   @Field()
   message: string = "Session expired";

   @Field()
   status: number = 401;
}
