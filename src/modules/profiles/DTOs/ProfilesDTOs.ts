import { InputType, Field, ArgsType } from "type-graphql";

export interface ICreateProfileDTO {
   bio?: string;
   user_id: string;
}

@InputType()
export class createProfileInput {
   @Field({ nullable: true })
   bio?: string;

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