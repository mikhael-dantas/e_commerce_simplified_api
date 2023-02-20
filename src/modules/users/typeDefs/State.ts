import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class State {
    @Field()
    model: string = "state";

    @Field()
    state: string;

    @Field()
    expiration: string;
}