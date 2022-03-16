import express from 'express';
import cors from 'cors';

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

app.use(cors())
app.use(express.json())


app.post('/users', async (req, res) => {
   const user = await prisma.user.create({
      data: {
         name: req.body.name,
         email: req.body.email,
      }
   })

   res.send(user)
})

app.get('/users', async (req, res) => {
   const users = await prisma.user.findMany()
   
   res.send(users)
})


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
