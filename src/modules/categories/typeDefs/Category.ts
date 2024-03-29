import { Field, ObjectType } from "type-graphql"


@ObjectType()
export class Category {
    @Field()
    id: string

    @Field({defaultValue: "category"})
    model: string

    @Field()
    name: string

    @Field()
    description: string

    @Field(()=> String, {nullable: true})
    image_id: string | null

    @Field(()=> String, {nullable: true})
    image_url: string | null

    @Field()
    inactive: boolean

    @Field()
    created_at: Date

    @Field()
    updated_at: Date
}