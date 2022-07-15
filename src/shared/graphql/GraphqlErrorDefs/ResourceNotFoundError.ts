import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ResourceNotFoundErrorTypeDef {
   @Field()
   model: string ="resourceNotFoundTypeDef";

   @Field()
   message: string = "Resource not found";
}
