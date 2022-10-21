import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Category {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    description: string

    @Field({nullable: true})
    image_id: string | null

    @Field({nullable: true})
    image_url: string | null

    @Field()
    inactive: boolean

    @Field()
    created_at: Date

    @Field()
    updated_at: Date
}