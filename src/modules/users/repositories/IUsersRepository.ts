import { LoginRegistry } from "../typeDefs/LoginRegistry";
import { User } from "../typeDefs/User";

export interface IUsersRepository {
    createState({
        state,
        expiration,
    }:{
        state: string,
        expiration: string
    }): Promise<{ state: string; expiration: string }>

    retrieveState(state: string): Promise<string | null>

    createUser({
        id,
    }:{
        id: string
    }): Promise<User>

    findUserById({
        id,
    }:{
        id: string
    }): Promise<User | null>

    crateLoginRegistry({
        userId,
    }:{
        userId: string
    }): Promise<LoginRegistry>

    listLoginRegistries({
        userId,
        take,
        skip,
    }:{
        userId: string,
        take: number,
        skip: number
    }): Promise<LoginRegistry[]>
}
