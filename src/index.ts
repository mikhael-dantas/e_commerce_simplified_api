import express from 'express';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import http from 'http';

// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
const app = express()
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

app.use(cors())
app.use(express.json())

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

async function startApolloServer(typeDefs: any, resolvers: any) {
   const httpServer = http.createServer(app);
   const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
   });
   await server.start();
   server.applyMiddleware({ app });
   await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
   console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

const resolvers = {
   Query: {
      books: () => books,
   },
};

const typeDefs = gql`
   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

   # This "Book" type defines the queryable fields for every book in our data source.
   type Book {
      title: String
      author: String
   }

   # The "Query" type is special: it lists all of the available queries that
   # clients can execute, along with the return type for each. In this
   # case, the "books" query returns an array of zero or more Books (defined above).
   type Query {
      books: [Book]
   }
`;

const books = [
   {
      title: 'The Awakening',
      author: 'Kate Chopin',
   },
   {
      title: 'City of Glass',
      author: 'Paul Auster',
   },
];

startApolloServer(typeDefs, resolvers)
