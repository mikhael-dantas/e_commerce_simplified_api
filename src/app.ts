import express, { Request } from 'express';

import "express-async-errors";
import 'reflect-metadata'
import './shared/container'

import cors from 'cors';
import { AppError } from './shared/errors/AppError';
import { router } from './routes';

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql';

import { UsersResolver } from './modules/users/resolvers/UsersResolver';
import { ProfilesResolver } from './modules/profiles/resolvers/ProfilesResolver';

export interface IContext {
   req: Request;
}

export const returnApp: () => Promise<express.Application> = async () => {
   const app = express()

   app.use(cors())
   app.use(express.json())

   // add routes from routes.ts
   app.use('/', router)
   
   const GraphqlSchema = await buildSchema({
      resolvers: [UsersResolver, ProfilesResolver],
   });

   app.use(
      '/graphql',
      graphqlHTTP((req) => ({
         schema: GraphqlSchema,
         graphiql: true,
         context: {
            req,
         },
      })),
   );

   app.get('/', async (req, res) => {
      res.send("hello world")
   })

   app.use(
      (err: Error, request: express.Request, response: express.Response, _next: express.NextFunction) => {
      if (err instanceof AppError) {
         return response.status(err.statusCode).json({
            message: err.message
         });
      }
   
      return response.status(500).json({
         status: "error",
         message: `Internal server error - ${err.message} `,
      });
      }
   );

   return app
}