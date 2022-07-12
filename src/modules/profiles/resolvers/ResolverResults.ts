import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/UnauthorizedTokenError";
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
      ResourceNotFoundErrorTypeDef
   ] as const, 
   resolveType: value => {
      if ("user_id" in value && "bio" in value) {
         return Profile;
      }
      if ("resourceNotFound" in value) {
         return ResourceNotFoundErrorTypeDef;
      }
      undefined;
   },
})

export const SearchProfilesResults = createUnionType({
   name: "SearchProfilesResults",
   types: () => [
      Profile,
   ] as const, 
})
