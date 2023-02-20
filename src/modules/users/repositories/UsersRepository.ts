import { Redis } from "ioredis";
import { IUsersRepository } from "./IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UsersRepository implements IUsersRepository {
    
    constructor(
        @inject('Redis')
        private redisClient: Redis
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
}