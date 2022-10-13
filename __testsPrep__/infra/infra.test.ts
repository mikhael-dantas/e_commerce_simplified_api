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
   require("dotenv").config()
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

   for (let i = 0; i < correctVariables.length; i++) {
      const variable = correctVariables[i]
      expect(process.env[variable]).toBeDefined()
   }
})