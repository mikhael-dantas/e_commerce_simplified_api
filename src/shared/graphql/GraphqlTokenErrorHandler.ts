import { ExpiredTokenErrorTypeDef } from "./GraphqlErrorDefs/ExpiredTokenError";
import { InvalidTokenErrorTypeDef } from "./GraphqlErrorDefs/InvalidTokenError";
import { MissingTokenErrorTypeDef } from "./GraphqlErrorDefs/MissingTokenError";

export function graphqlTokenErrorHandler(error: any) {
   switch (error.message) {
      case "jwt expired":
         return new ExpiredTokenErrorTypeDef()

      case "invalid signature":
         return new InvalidTokenErrorTypeDef()
      case "jwt malformed":
         return new InvalidTokenErrorTypeDef()
      case "jwt must be a string":
         return new InvalidTokenErrorTypeDef()

      case "jwt must be provided": 
         return new MissingTokenErrorTypeDef()
      case "missing authorization header":
         return new MissingTokenErrorTypeDef()
      default:
         console.log('unknown error', error)
         return new InvalidTokenErrorTypeDef()
   }
}