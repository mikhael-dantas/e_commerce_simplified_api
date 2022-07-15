import { createUnionType } from "type-graphql";
import { ExpiredTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/MissingTokenError";
import { ResourceNotFoundErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/ResourceNotFoundError";
import { UnauthorizedTokenErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/UnauthorizedTokenError";
import { Product } from "../typeDefs/Product";

// export const CreateProductResults = createUnionType({
//    name: "CreateProfileResults",
//    types: () => [
//       Profile,
//       ExpiredTokenErrorTypeDef,
//       MissingTokenErrorTypeDef,
//       InvalidTokenErrorTypeDef,
//       UnauthorizedTokenErrorTypeDef,
//       ResourceNotFoundErrorTypeDef
//    ] as const, 
// })

export const ListProductsResults = createUnionType({
   name: "ListProductsResults",
   types: () => [
      Product,
   ] as const, 
   resolveType: value => {
      if (value.model == "product") {
         return Product;
      }
      undefined;
   },
})

export const FindProductResults = createUnionType({
   name: "FindProductResults",
   types: () => [
      Product,
   ] as const,
   resolveType: value => {
      if (value.model == "product") {
         return Product;
      }
      undefined;
   }
})