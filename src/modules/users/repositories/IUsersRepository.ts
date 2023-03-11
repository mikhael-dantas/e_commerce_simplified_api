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

    createLoginRegistry({
        user_id,
    }:{
        user_id: string
    }): Promise<LoginRegistry>

    listLoginRegistries({
        user_id,
        take,
        skip,
    }:{
        user_id: string,
        take: number,
        skip: number
    }): Promise<LoginRegistry[]>
}
