import { Field, ObjectType } from "type-graphql";
import { Image } from "./Image";

@ObjectType()
export class ImagesPagination {
    @Field()
    model: string = "imagesPagination";

    @Field()
    count: number;

    @Field()
    cursor: number;

    @Field(() => [Image])
    data: Image[]
}