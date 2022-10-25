import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';



const prismaClient = new PrismaClient()

Object.assign(global, {
    prismaClient,
});

