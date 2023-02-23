import { User } from "../../typeDefs/User";

export interface ICreateUserUseCase {
    execute({
        id,
    }:{
        id: string
    }): Promise<User>
}