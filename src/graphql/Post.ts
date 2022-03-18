import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Post {
   @Field()
   id: string;

   @Field()
   title: string;

   @Field({ nullable: true })
   content?: string;

   @Field()
   published: boolean;

   @Field()
   created_at: Date;

   @Field()
   updated_at: Date;

   @Field()
   author_id: string;
}

export { Post };