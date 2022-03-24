import { ExpiredTokenErrorTypeDef } from "./GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "./GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "./GraphqlErrorDefs/MissingTokenError";

export function graphqlTokenErrorHandler(error: any) {
   switch (error.message) {
      case "jwt expired":
         return new ExpiredTokenErrorTypeDef()
      case "invalid signature":
         return new InvalidTokenErrorTypeDef()
      case "missing authorization header":
         return new MissingTokenErrorTypeDef()
      default:
         throw new Error(error.message)
   }
}