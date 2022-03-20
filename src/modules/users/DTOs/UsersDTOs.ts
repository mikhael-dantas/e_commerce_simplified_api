import { InputType, Field, ArgsType } from "type-graphql";

export interface ICreateUserDTO {
   name: string;
   email: string;
   password: string;
}

@InputType()
export class createUserInput {
   @Field()
   name: string;

   @Field()
   email: string;

   @Field()
   password: string;
}

@ArgsType()
export class usersArgs {
   @Field()
   take: number;
   
   @Field()
   skip: number;
}