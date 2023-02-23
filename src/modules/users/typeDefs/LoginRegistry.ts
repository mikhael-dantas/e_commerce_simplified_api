import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginRegistry {
    @Field()
    model: string = "login_registry";

    @Field()
    id: string;

    @Field()
    created_at: Date;

    @Field()
    user_id: string;
}