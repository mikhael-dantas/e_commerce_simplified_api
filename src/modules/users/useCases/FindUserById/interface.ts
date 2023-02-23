import { User } from "../../typeDefs/User";

export interface IFindUserByIdUseCase {
    execute({
        id,
    }:{
        id: string
    }): Promise<User>
}