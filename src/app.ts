import 'reflect-metadata'
import './shared/container'
import express from 'express';
import cors from 'cors';

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql';

import { UserResolver } from './modules/users/resolvers/UsersResolver';

export const returnApp: () => Promise<express.Application> = async () => {
   const app = express()

   app.use(cors())
   app.use(express.json())
   
   const GraphqlSchema = await buildSchema({
      resolvers: [UserResolver],
   });

   app.use(
      '/graphql',
      graphqlHTTP({
         schema: GraphqlSchema,
         graphiql: true,
      }),
   );

   app.get('/', async (req, res) => {
      res.send("hello express world")
   })

   return app
}