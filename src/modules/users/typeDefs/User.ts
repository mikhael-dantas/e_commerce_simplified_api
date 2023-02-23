import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field()
    model: string = "user";

    @Field()
    id: string;

    @Field()
    created_at: Date;
}