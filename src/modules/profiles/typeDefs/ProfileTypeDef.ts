import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Profile {
   @Field()
   id: string;

   @Field({ nullable: true })
   bio?: string;

   @Field()
   created_at: Date;
   
   @Field()
   updated_at: Date;

   @Field()
   user_id: string;

}

export { Profile };