import { inject, injectable } from 'tsyringe';
import { ICreateLoginRegistryUseCase } from "./interface";
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICheckAccessTokenUseCase } from '../CheckAccessToken/interface';
import { LoginRegistry } from '../../typeDefs/LoginRegistry';
import { IFindUserByIdUseCase } from '../FindUserById/interface';
import { ICreateUserUseCase } from '../CreateUser/interface';

@injectable()
export class CreateLoginRegistryUseCase implements ICreateLoginRegistryUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private checkAccessTokenUseCase: ICheckAccessTokenUseCase,
        private findUserByIdUseCase: IFindUserByIdUseCase,
        private createUserUseCase: ICreateUserUseCase,
    ) {}

    async execute({
        accessToken,
        secret,
    }: {
        accessToken: string,
        secret: string
    }): Promise<LoginRegistry> {
        let passed = true
        let decodedToken

        try {
            decodedToken = await this.checkAccessTokenUseCase.execute({
                token: accessToken,
                secret,
            })
        } catch (err) {
            passed = false
        }
        if (!passed) {
            throw new Error("Invalid token");
        }


        const {sub} = decodedToken as any


        let user = await this.findUserByIdUseCase.execute({
            id: sub
        }).catch(() => {
            return undefined
        });

        if (!user) {
            user = await this.createUserUseCase.execute({
                id: sub
            })
        }


        const loginRegistry = await this.usersRepository.createLoginRegistry({
            userId: sub,
        });

        return loginRegistry;
    }
}