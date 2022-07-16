// test prisma connection with database

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
jest.setTimeout(30000)

test("should be able to connect with database", async () => {
   const connectAndDisconnect = async () => {
      await prisma.$connect()
      await new Promise(resolve => setTimeout(resolve, 10000))
      await prisma.$disconnect()
      await new Promise(resolve => setTimeout(resolve, 10000))
      return true
   }

   expect(await connectAndDisconnect()).toBe(true)
})