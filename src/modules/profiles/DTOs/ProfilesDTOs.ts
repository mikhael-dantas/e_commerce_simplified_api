import { InputType, Field, ArgsType } from "type-graphql";

export interface ICreateProfileDTO {
   bio: string | null;
   user_id: string;
}

@InputType()
export class createProfileInput {
   @Field()
   bio: string | null;

   @Field()
   user_id: string;
}

@ArgsType()
export class profilesArgs {
   @Field()
   take: number;
   
   @Field()
   skip: number;
}