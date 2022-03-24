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
export enum FieldsToSortUsers {
   Id = "id",
   Name = "name",
   Email = "email",
   CreatedAt = "created_at",
   UpdatedAt = "updated_at",
}

registerEnumType(FieldsToSortUsers, {
   name: "FieldToSortUsers", 
   description: "fields that the query accepts to sort the user",
});

//find user
export enum FieldsToSearchUser {
   Id = "id",
   Email = "email",
}

registerEnumType(FieldsToSearchUser, {
   name: "FieldToSeachUser", 
   description: "fields that the query accepts to search the user",
});