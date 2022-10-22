import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class InvalidInputErrorTypeDef {
    @Field()
    model: string ="InvalidInputErrorTypeDef";

    @Field()
    message: string;

    @Field()
    location: string

    @Field()
    status: number = 400;
}
