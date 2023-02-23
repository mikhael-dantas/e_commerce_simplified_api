import { container } from 'tsyringe';
import { LoginAttemptInit } from '../useCases/loginAttemptInit';
import { RetrieveStateUseCase as LoginAttemptRetrieve } from '../useCases/RetrieveState';
import { LoginAttemptInitResults, LoginAttemptRetrieveResults } from './ResultTypes';
import { Arg, Mutation, Query } from "type-graphql";


export class UsersResolver {
    constructor(
        private injections?: {
            loginAttemptInitUseCase?: LoginAttemptInit;
            loginAttemptRetrieveUseCase?: LoginAttemptRetrieve;
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
}