import { CreateLoginRegistryUseCase } from './../useCases/CreateLoginRegistry/index';
import { container } from 'tsyringe';
import { LoginAttemptInit } from '../useCases/loginAttemptInit';
import { RetrieveStateUseCase as LoginAttemptRetrieve } from '../useCases/RetrieveState';
import { LoginAttemptInitResults, LoginAttemptRetrieveResults, LoginRegistrationResults, LoginRegistryListResults } from './ResultTypes';
import { Arg, Mutation, Query } from "type-graphql";
import { ICreateLoginRegistryUseCase } from '../useCases/CreateLoginRegistry/interface';
import { IListLoginRegistriesUseCase } from '../useCases/ListLoginRegistries/interface';
import { ListLoginRegistriesUseCase } from '../useCases/ListLoginRegistries';


export class UsersResolver {
    constructor(
        private injections?: {
            loginAttemptInitUseCase?: LoginAttemptInit;
            loginAttemptRetrieveUseCase?: LoginAttemptRetrieve;
            createLoginRegistryUseCase?: ICreateLoginRegistryUseCase;
            listLoginRegistriesUseCase?: IListLoginRegistriesUseCase
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
        if (!this.injections?.createLoginRegistryUseCase) {
            useCase = container.resolve(CreateLoginRegistryUseCase);
        } else {
            useCase = this.injections.createLoginRegistryUseCase;
        }

        const secret = process.env.AUTH0_JWT_SECRET
        if (!secret) { throw new Error("JWT_SECRET not defined") }

        const loginRegistrationResponse = await useCase.execute({
            accessToken,
            secret
        });

        return loginRegistrationResponse
    }

    @Query(returns => [LoginRegistryListResults])
    async loginRegistryList(
        @Arg('userId') userId: string,
        @Arg('skip') skip: number,
        @Arg('take') take: number,
    ): Promise<typeof LoginRegistryListResults[]> {
        let useCase
        if (!this.injections?.listLoginRegistriesUseCase) {
            useCase = container.resolve(ListLoginRegistriesUseCase);
        } else {
            useCase = this.injections.listLoginRegistriesUseCase;
        }

        const loginRegistryListResponse = await useCase.execute({userId, skip, take});

        return loginRegistryListResponse
    }
}