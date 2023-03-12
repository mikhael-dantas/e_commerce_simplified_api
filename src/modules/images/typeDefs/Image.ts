import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Image {
    @Field()
    model: string = "image";

    @Field()
    id: string;

    @Field()
    created_at: Date;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => [String])
    tags: string[];

    @Field()
    image_url: string;

    @Field()
    user_id: string;
}