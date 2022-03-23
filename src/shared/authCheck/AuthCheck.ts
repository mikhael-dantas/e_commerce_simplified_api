require('dotenv').config();
import { Request } from "express";
import { verify } from 'jsonwebtoken';
import { ExpiredTokenErrorTypeDef } from "../errors/GraphqlErrorDefs/ExpiredTokenError";
import { MissingTokenErrorTypeDef } from "../errors/GraphqlErrorDefs/MissingTokenError";

interface IPayload {
   user: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
   },
   sub: string;
}

export function AuthCheck(
   authorization: string | undefined
   ) {
   const authHeader = authorization

   const secret = process.env.JWT_SECRET

   if (!secret) {
      console.log('JWT_SECRET is not defined in .env file');
      throw new Error("Internal server error")
   }

   if (!authHeader) {
      return new MissingTokenErrorTypeDef()
   }

   const [, token] = authHeader.split(" ");

   try {
      const decoded = verify(token, secret) as IPayload;
      const { user } = decoded;

      return {
         user,
         status: 200,
         message: "user is authenticated",
      };
   } catch {
      return new ExpiredTokenErrorTypeDef()
   }
}