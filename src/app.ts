import 'reflect-metadata'
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql';

import { UserResolver } from './graphql/UserResolver';

// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// async function that returns an express app
export const returnApp: () => Promise<express.Application> = async () => {
   const app = express()
   const GraphqlSchema = await buildSchema({
      resolvers: [UserResolver],
   });

   app.use(cors())
   app.use(express.json())

   app.use(
      '/graphql',
      graphqlHTTP({
         schema: GraphqlSchema,
         graphiql: true,
      }),
   );

   app.post('/users', async (req, res) => {
      // const user = await prisma.user.create({
      //    data: {
      //       name: req.body.name,
      //       email: req.body.email,
      //    }
      // })

      // res.send(user)

      res.send("ok")
   })

   app.get('/users', async (req, res) => {
      // const users = await prisma.user.findMany()
      
      // res.send(users)
      res.send("ok")
   })

   return app
}