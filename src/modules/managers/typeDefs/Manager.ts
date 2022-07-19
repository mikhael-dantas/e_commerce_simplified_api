import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Manager {
   @Field()
   id: string

   @Field()
   model: string

   @Field()
   name: string

   @Field()
   email: string

   @Field()
   password: string

   @Field()
   admin: boolean

   @Field()
   deleted: boolean

   @Field()
   inactive: boolean

   @Field()
   created_at: Date

   @Field()
   updated_at: Date
}