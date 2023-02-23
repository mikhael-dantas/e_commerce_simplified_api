import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserUseCase } from "./interface";
import { User } from '../../typeDefs/User';

injectable()
export class createUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        id,
    }:{
        id: string
    }): Promise<User> {
        const user = await this.usersRepository.createUser({ id });

        return user;
    }
}