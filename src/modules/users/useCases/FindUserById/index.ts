import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IFindUserByIdUseCase } from "./interface";
import { User } from '../../typeDefs/User';

@injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ id }: { id: string }): Promise<User> {
        const user = await this.usersRepository.findUserById({id});

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}