// test prisma connection with database

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
jest.setTimeout(25000)

test("should be able to connect with database", async () => {
   await new Promise((resolve, reject) => {
      prisma.$connect().then(() => {
         resolve('done')
      }).catch(err => {
         reject(err)
      })
   }).catch(err => {
      throw new Error("Error connecting to database")
   })
   
   await new Promise((resolve, reject) => {
      prisma.$disconnect().then(() => {
         resolve('done')
      }).catch(err => {
         reject(err)
      })
   }).catch(err => {
      throw new Error("Error disconnecting from database")
   })
})

test("should have all the correct environment variables", async () => {
   const env = require("dotenv").config()
   const correctVariables = [
      "SERVER_HOST",
      "SERVER_PORT",
      "DATABASE_URL",
      "JWT_SECRET",
      "JWT_EXPIRATION",
      // "JWT_REFRESH_EXPIRATION",
      // "JWT_REFRESH_SECRET",
      // "JWT_REFRESH_ALGORITHM",
      // "JWT_ALGORITHM",
   ]
   
   const parsedKeys = Object.keys(env.parsed)
   const parsedValues = Object.values(env.parsed)

   expect(env).toHaveProperty("parsed")

   correctVariables.forEach(key => {
      expect(parsedKeys).toContain(key)
   })

   parsedValues.forEach(value => {
      expect(value).toBeDefined()
   })
})