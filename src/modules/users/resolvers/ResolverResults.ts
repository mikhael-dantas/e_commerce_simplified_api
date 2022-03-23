import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/UnauthorizedTokenError";
import { Profile } from "../../profiles/typeDefs/ProfileTypeDef";
import { User } from "../typeDefs/UserTypeDef";

export const CreateUserResults = createUnionType({
   name: "CreateUserResults",
   types: () => [
      User,
   ] as const, 
})

export const SearchUserResults = createUnionType({
   name: "SearchUserResults",
   types: () => [
      User,
      ExpiredTokenErrorTypeDef,
      MissingTokenErrorTypeDef,
      InvalidTokenErrorTypeDef,
      UnauthorizedTokenErrorTypeDef,
      ResourceNotFoundErrorTypeDef
   ] as const, 
})

export const SearchUsersResults = createUnionType({
   name: "SearchUsersResults",
   types: () => [
      User,
      ExpiredTokenErrorTypeDef,
      MissingTokenErrorTypeDef,
      InvalidTokenErrorTypeDef,
      UnauthorizedTokenErrorTypeDef,
      ResourceNotFoundErrorTypeDef
   ] as const, 
})

export const SearchUserProfileResults = createUnionType({
   name: "SearchUserResults",
   types: () => [
      Profile,
      ExpiredTokenErrorTypeDef,
      MissingTokenErrorTypeDef,
      UnauthorizedTokenErrorTypeDef,
      ResourceNotFoundErrorTypeDef
   ] as const, 
})