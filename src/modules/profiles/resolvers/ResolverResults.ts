import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/UnauthorizedTokenError";
import { Profile } from "../../profiles/typeDefs/ProfileTypeDef";

export const CreateProfileResults = createUnionType({
   name: "CreateProfileResults",
   types: () => [
      Profile,
      ExpiredTokenErrorTypeDef,
      MissingTokenErrorTypeDef,
      InvalidTokenErrorTypeDef,
      UnauthorizedTokenErrorTypeDef,
      ResourceNotFoundErrorTypeDef
   ] as const, 
})

export const SearchProfileResults = createUnionType({
   name: "SearchProfileResults",
   types: () => [
      Profile,
   ] as const, 
})

export const SearchProfilesResults = createUnionType({
   name: "SearchProfilesResults",
   types: () => [
      Profile,
   ] as const, 
})
