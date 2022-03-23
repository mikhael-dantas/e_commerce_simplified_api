require('dotenv').config();
import { verify } from 'jsonwebtoken';

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
   let authHeader = authorization

   const secret = process.env.JWT_SECRET as string

   if (!authHeader) {
      authHeader = ''
   }

   const [, token] = "authHeader".split(" ");

   const decoded = verify(token, secret) as IPayload;

   return {
      user: decoded.user,
      user_id: decoded.sub,
   };
}