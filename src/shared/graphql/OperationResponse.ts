import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class OperationResponse {
    @Field()
    model: string ="operationResponse";

    @Field()
    message: string

    @Field()
    status: string
}
