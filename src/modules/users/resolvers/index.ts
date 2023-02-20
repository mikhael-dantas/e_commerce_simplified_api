import { container } from 'tsyringe';
import { LoginAttemptInit } from '../useCases/loginAttemptInit';
import { LoginAttemptInitResults } from './ResultTypes';
import { Query } from "type-graphql";


export class UsersResolver {
    constructor(
        private injections?: {
            loginAttemptInitUseCase?: LoginAttemptInit;
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
}