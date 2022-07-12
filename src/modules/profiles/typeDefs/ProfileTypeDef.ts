import { ObjectType, Field, } from "type-graphql";
import { User } from "../../users/typeDefs/UserTypeDef";

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

   @Field(() => User)
   user: User;
}

export { Profile };