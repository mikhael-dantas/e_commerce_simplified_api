import { InputType, Field, ArgsType, registerEnumType } from "type-graphql";

// create user
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

// auth user
export interface IAuthUserDTO {
   user: {
      id: string;
      name: string;
      email: string;
   };
   token: string;
}

// find users
@ArgsType()
export class usersArgs {
   @Field({nullable: true})
   take: number;
   
   @Field({nullable: true})
   skip: number;
}
//find user

export enum FieldsToSearchUser {
   Id = "id",
   Email = "email",
}

registerEnumType(FieldsToSearchUser, {
   name: "FieldToSeachUser", 
   description: "fields that the query accepts to search the user",
});