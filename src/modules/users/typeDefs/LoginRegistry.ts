import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginRegistry {
    @Field()
    model: string = "loginRegistry";

    @Field()
    id: string;

    @Field()
    created_at: Date;

    @Field()
    user_id: string;
}