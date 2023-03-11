import { LoginRegistry } from "../../typeDefs/LoginRegistry";

export interface IListLoginRegistriesUseCase {
    execute({
        user_id,
        take,
        skip,
    }:{
        user_id: string,
        take?: number,
        skip?: number
    }): Promise<LoginRegistry[]>
}