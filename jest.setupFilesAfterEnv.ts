import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';


const redisPort = process.env.REDIS_PORT
if (!redisPort) {
    throw new Error('Redis port not set')
}

const prismaClient = new PrismaClient()
const redisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(redisPort),
}

Object.assign(global, {
    prismaClient,
    redisOptions,
});

