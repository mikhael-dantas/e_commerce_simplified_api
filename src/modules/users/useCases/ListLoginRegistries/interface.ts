import { LoginRegistry } from "../../typeDefs/LoginRegistry";

export interface IListLoginRegistriesUseCase {
    execute({
        userId,
        take,
        skip,
    }:{
        userId: string,
        take?: number,
        skip?: number
    }): Promise<LoginRegistry[]>
}