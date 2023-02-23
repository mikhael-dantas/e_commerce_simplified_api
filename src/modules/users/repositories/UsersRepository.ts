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
        private prismaClient: PrismaClient,
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
        const user = await this.prismaClient.user.findUnique({
            where: {
                id,
            }
        });
        return user;
    }

    async crateLoginRegistry({
        userId,
    }:{
        userId: string
    }): Promise<LoginRegistry> {
        const loginRegistry = await this.prismaClient.loginRegistry.create({
            data: {
                id : randomUUID(),
                user_id: userId,
            }
        });

        return loginRegistry;
    }

    async listLoginRegistries({
        userId,
        take,
        skip,
    }:{
        userId: string,
        take: number,
        skip: number
    }): Promise<LoginRegistry[]> {
        const loginRegistries = await this.prismaClient.loginRegistry.findMany({
            where: {
                user_id: userId,
            },
            take,
            skip,
        });
        return loginRegistries;
    }
}