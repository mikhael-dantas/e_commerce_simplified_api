import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ExpiredTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/errors/GraphqlErrorDefs/UnauthorizedTokenError";
import { User } from "../typeDefs/UserTypeDef";

export const SearchUserResults = createUnionType({
   name: "SearchUserResults",
   types: () => [
      User,
      ExpiredTokenErrorTypeDef,
      MissingTokenErrorTypeDef,
      UnauthorizedTokenErrorTypeDef,
      ResourceNotFoundErrorTypeDef
   ] as const, 
   
})