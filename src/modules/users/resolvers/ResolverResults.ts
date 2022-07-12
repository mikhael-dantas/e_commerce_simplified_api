import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/UnauthorizedTokenError";
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
   resolveType: value => {
      if ("email" in value && "name" in value) {
         return User;
      }
      if ("invalidToken" in value) {
         return InvalidTokenErrorTypeDef;
      }
      if ("missingToken" in value) {
         return MissingTokenErrorTypeDef;
      }
      if ("expiredToken" in value) {
         return ExpiredTokenErrorTypeDef;
      }
      if ("resourceNotFound" in value) {
         return ResourceNotFoundErrorTypeDef;
      }
      if ("unauthorizedToken" in value) {
         return UnauthorizedTokenErrorTypeDef;
      }
      undefined;
   },
})
