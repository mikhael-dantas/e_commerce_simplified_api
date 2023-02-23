import { CreateLoginRegistryUseCase } from './../useCases/CreateLoginRegistry/index';
import { container } from 'tsyringe';
import { LoginAttemptInit } from '../useCases/loginAttemptInit';
import { RetrieveStateUseCase as LoginAttemptRetrieve } from '../useCases/RetrieveState';
import { LoginAttemptInitResults, LoginAttemptRetrieveResults, LoginRegistrationResults } from './ResultTypes';
import { Arg, Mutation, Query } from "type-graphql";
import { ICreateLoginRegistryUseCase } from '../useCases/CreateLoginRegistry/interface';


export class UsersResolver {
    constructor(
        private injections?: {
            loginAttemptInitUseCase?: LoginAttemptInit;
            loginAttemptRetrieveUseCase?: LoginAttemptRetrieve;
            CreateLoginRegistryUseCase?: ICreateLoginRegistryUseCase
        }
    ) {}
    @Query(returns => LoginAttemptInitResults)
    async loginAttemptInit(): Promise<typeof LoginAttemptInitResults> {
        let useCase
        if (!this.injections?.loginAttemptInitUseCase) {
            useCase = container.resolve(LoginAttemptInit);
        } else {
            useCase = this.injections.loginAttemptInitUseCase;
        }

        const loginAttemptInitResponse = await useCase.execute();
        return loginAttemptInitResponse
    }

    @Mutation(returns => LoginAttemptRetrieveResults)
    async loginAttemptRetrieve(
        @Arg('state') state: string
    ): Promise<typeof LoginAttemptRetrieveResults> {
        let useCase
        if (!this.injections?.loginAttemptRetrieveUseCase) {
            useCase = container.resolve(LoginAttemptRetrieve);
        } else {
            useCase = this.injections.loginAttemptRetrieveUseCase;
        }

        const loginAttemptRetrieveResponse = await useCase.execute(state);
        return loginAttemptRetrieveResponse
    }

    @Mutation(returns => LoginRegistrationResults)
    async loginRegistration(
        @Arg('accessToken') accessToken: string,
    ): Promise<typeof LoginRegistrationResults> {
        let useCase
        if (!this.injections?.CreateLoginRegistryUseCase) {
            useCase = container.resolve(CreateLoginRegistryUseCase);
        } else {
            useCase = this.injections.CreateLoginRegistryUseCase;
        }

        const secret = process.env.AUTH0_JWT_SECRET
        if (!secret) { throw new Error("JWT_SECRET not defined") }

        const loginRegistrationResponse = await useCase.execute({
            accessToken,
            secret
        });

        return loginRegistrationResponse
    }
}