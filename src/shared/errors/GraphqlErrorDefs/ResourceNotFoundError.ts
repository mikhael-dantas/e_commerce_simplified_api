import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ResourceNotFoundErrorTypeDef {
   @Field()
   resourceNotFound: boolean = true;

   @Field()
   message: string = "Resource not found";
}
