import { Redis } from "ioredis";
import { IUsersRepository } from "./IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../typeDefs/User";
import { PrismaClient } from "@prisma/client";
import { LoginRegistry } from "../typeDefs/LoginRegistry";
import { randomUUID } from "node:crypto";

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @inject('Redis')
        private redisClient: Redis,
        @inject('PrismaClient')
        private prismaClient?: PrismaClient,
    ) {}

    async createState({
        state,
        expiration,
    }:{
        state: string,
        expiration: string
    }): Promise<{ state: string; expiration: string }> {
        const userState = await this.redisClient.set(state, '1', 'EX', expiration);
        if (!userState) {
            throw new Error('Could not create state');
        }
        return { state, expiration };
    }

    async retrieveState(state: string): Promise<string | null> {
        const retrievedState = await this.redisClient.getdel(state);
        if (!retrievedState) {
            return null;
        }
        return retrievedState;
    }

    async createUser({
        id,
    }:{
        id: string
    }): Promise<User> {
        if (!this.prismaClient) {throw new Error('Prisma client not initialized');}
        const user = await this.prismaClient.user.create({
            data: {
                id,
            }
        });
        return user;
    }

    async findUserById({
        id,
    }:{
        id: string
    }): Promise<User | null> {
        if (!this.prismaClient) {throw new Error('Prisma client not initialized');}
        const user = await this.prismaClient.user.findUnique({
            where: {
                id,
            }
        });
        return user;
    }

    async createLoginRegistry({
        user_id,
    }:{
        user_id: string
    }): Promise<LoginRegistry> {
        if (!this.prismaClient) {throw new Error('Prisma client not initialized');}
        const loginRegistry = await this.prismaClient.loginRegistry.create({
            data: {
                id : randomUUID(),
                user_id: user_id,
            }
        });

        return loginRegistry;
    }

    async listLoginRegistries({
        user_id,
        take,
        skip,
    }:{
        user_id: string,
        take: number,
        skip: number
    }): Promise<LoginRegistry[]> {
        if (!this.prismaClient) {throw new Error('Prisma client not initialized');}
        const loginRegistries = await this.prismaClient.loginRegistry.findMany({
            where: {
                user_id: user_id,
            },
            take,
            skip,
        });
        return loginRegistries;
    }
}