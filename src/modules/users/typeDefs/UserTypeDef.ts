import { ObjectType, Field } from "type-graphql";
import { Profile } from "../../profiles/typeDefs/ProfileTypeDef";

@ObjectType()
class User {
   @Field()
   id: string;

   @Field()
   email: string;

   @Field()
   name: string;

   @Field()
   password: string;

   @Field()
   created_at: Date;

   @Field()
   updated_at: Date;

   @Field(() => Profile)
   profile: Profile;
}

export { User };