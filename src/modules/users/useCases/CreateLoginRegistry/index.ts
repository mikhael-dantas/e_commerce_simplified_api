import { inject, injectable } from 'tsyringe';
import { ICreateLoginRegistryUseCase } from "./interface";
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICheckAccessTokenUseCase } from '../CheckAccessToken/interface';
import { LoginRegistry } from '../../typeDefs/LoginRegistry';
import { IFindUserByIdUseCase } from '../FindUserById/interface';
import { ICreateUserUseCase } from '../CreateUser/interface';
import { CheckAccessTokenUseCase } from '../CheckAccessToken';
import { FindUserByIdUseCase } from '../FindUserById';
import { CreateUserUseCase } from '../CreateUser';

@injectable()
export class CreateLoginRegistryUseCase implements ICreateLoginRegistryUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository?: IUsersRepository,
        ) {}
        
        async execute({
            accessToken,
            secret,
            checkAccessTokenUseCase,
            findUserByIdUseCase,
            createUserUseCase,
        }: {
            accessToken: string,
            secret: string
            checkAccessTokenUseCase?: ICheckAccessTokenUseCase,
            findUserByIdUseCase?: IFindUserByIdUseCase,
            createUserUseCase?: ICreateUserUseCase,
    }): Promise<LoginRegistry> {
        if (!this.usersRepository) {
            throw new Error("Users repository not provided");
        }
        if (!checkAccessTokenUseCase) {
            checkAccessTokenUseCase = new CheckAccessTokenUseCase()
        }
        if (!findUserByIdUseCase) {
            findUserByIdUseCase = new FindUserByIdUseCase(this.usersRepository)
        }
        if (!createUserUseCase) {
            createUserUseCase = new CreateUserUseCase(this.usersRepository)
        }


        let passed = true
        let decodedToken


        try {
            decodedToken = await checkAccessTokenUseCase.execute({
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


        let user
        try {
            user = await findUserByIdUseCase.execute({
                id: sub
            })
        } catch (err) {
                user = undefined
        }

        if (!user) {
            user = await createUserUseCase.execute({
                id: sub
            })
        }


        const loginRegistry = await this.usersRepository.createLoginRegistry({
            user_id: sub,
        });

        return loginRegistry;
    }
}