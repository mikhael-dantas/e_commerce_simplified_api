import { inject, injectable } from "tsyringe";
import { IListLoginRegistriesUseCase } from "./interface";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { LoginRegistry } from "../../typeDefs/LoginRegistry";

@injectable()
export class ListLoginRegistriesUseCase implements IListLoginRegistriesUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    async execute({
        user_id,
        skip = 0,
        take = 2,
    }:{
        user_id: string,
        skip?: number,
        take?: number
    }): Promise<LoginRegistry[]> {
        const loginRegistries = await this.usersRepository.listLoginRegistries({
            user_id,
            skip,
            take
        });

        return loginRegistries;
    }
}