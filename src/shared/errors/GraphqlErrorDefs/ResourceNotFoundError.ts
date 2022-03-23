import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ResourceNotFoundErrorTypeDef {
   @Field()
   message: string = "Resource not found";
}
