import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class OperationResponseTypeDef {
    @Field()
    model: string ="operationResponseTypeDef";

    @Field()
    message: string

    @Field()
    status: string
}
