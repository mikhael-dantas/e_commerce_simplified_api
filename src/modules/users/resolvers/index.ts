import { CreateLoginRegistryUseCase } from './../useCases/CreateLoginRegistry/index';
import { container } from 'tsyringe';
import { LoginAttemptInit } from '../useCases/loginAttemptInit';
import { RetrieveStateUseCase as LoginAttemptRetrieve } from '../useCases/RetrieveState';
import { LoginAttemptInitResults, LoginAttemptRetrieveResults, LoginRegistrationResults, LoginRegistryListResults } from './ResultTypes';
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { ICreateLoginRegistryUseCase } from '../useCases/CreateLoginRegistry/interface';
import { IListLoginRegistriesUseCase } from '../useCases/ListLoginRegistries/interface';
import { ListLoginRegistriesUseCase } from '../useCases/ListLoginRegistries';
import { CheckClientKeyUseCase, ICheckClientKeyUseCase } from '../../../shared/authCheck/client/CheckClientKey';
import { UnauthorizedError } from '../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError';


export class UsersResolver {
    constructor(
        private injections?: {
            loginAttemptInitUseCase?: LoginAttemptInit;
            loginAttemptRetrieveUseCase?: LoginAttemptRetrieve;
            createLoginRegistryUseCase?: ICreateLoginRegistryUseCase;
            listLoginRegistriesUseCase?: IListLoginRegistriesUseCase;
            checkClientKey?: ICheckClientKeyUseCase
        }
    ) {}
    @Query(returns => LoginAttemptInitResults)
    async loginAttemptInit(
        @Ctx() context: any
    ): Promise<typeof LoginAttemptInitResults> {
        const { req } = context
        const authorization = req?.headers?.authorization
        if (!authorization) {return new UnauthorizedError("No authorization header")}
        const key = authorization.split(' ')[1]
        if (!key) {return new UnauthorizedError("No authorization header")}


        let checkClientKey
        if (!this.injections?.checkClientKey) {checkClientKey = container.resolve(CheckClientKeyUseCase);} 
        else {checkClientKey = this.injections.checkClientKey;}

        const check = checkClientKey.execute({clientKey: key})
        if (!("authorized" in check)) { return check }


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
        @Ctx() context: any,
        @Arg('state') state: string
    ): Promise<typeof LoginAttemptRetrieveResults> {
        const { req } = context
        const authorization = req?.headers?.authorization
        if (!authorization) {return new UnauthorizedError("No authorization header")}
        const key = authorization.split(' ')[1]
        if (!key) {return new UnauthorizedError("No authorization header")}


        let checkClientKey
        if (!this.injections?.checkClientKey) {checkClientKey = container.resolve(CheckClientKeyUseCase);} 
        else {checkClientKey = this.injections.checkClientKey;}

        const check = checkClientKey.execute({clientKey: key})
        if (!("authorized" in check)) { return check }


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
        @Ctx() context: any,
        @Arg('accessToken') accessToken: string,
    ): Promise<typeof LoginRegistrationResults> {
        const { req } = context
        const authorization = req?.headers?.authorization
        if (!authorization) {return new UnauthorizedError("No authorization header")}
        const key = authorization.split(' ')[1]
        if (!key) {return new UnauthorizedError("No authorization header")}


        let checkClientKey
        if (!this.injections?.checkClientKey) {checkClientKey = container.resolve(CheckClientKeyUseCase);} 
        else {checkClientKey = this.injections.checkClientKey;}

        const check = checkClientKey.execute({clientKey: key})
        if (!("authorized" in check)) { return check }


        let useCase
        if (!this.injections?.createLoginRegistryUseCase) {useCase= container.resolve(CreateLoginRegistryUseCase);
        } else {useCase = this.injections.createLoginRegistryUseCase;}

        const secret = process.env.AUTH0_PUBLIC_KEY
        if (!secret) {throw new Error("JWT_SECRET not defined")}


        const loginRegistrationResponse = await useCase.execute({
            accessToken,
            secret
        });

        return loginRegistrationResponse
    }

    @Query(returns => [LoginRegistryListResults])
    async loginRegistryList(
        @Ctx() context: any,
        @Arg('user_id') user_id: string,
        @Arg('skip') skip: number,
        @Arg('take') take: number,
    ): Promise<typeof LoginRegistryListResults[]> {
        const { req } = context
        const authorization = req?.headers?.authorization
        if (!authorization) {return [new UnauthorizedError("No authorization header")]}
        const key = authorization.split(' ')[1]
        if (!key) {return [new UnauthorizedError("No authorization header")]}


        let checkClientKey
        if (!this.injections?.checkClientKey) {checkClientKey = container.resolve(CheckClientKeyUseCase);} 
        else {checkClientKey = this.injections.checkClientKey;}

        const check = checkClientKey.execute({clientKey: key})
        if (!("authorized" in check)) { return [check] }


        let useCase
        if (!this.injections?.listLoginRegistriesUseCase) {
            useCase = container.resolve(ListLoginRegistriesUseCase);
        } else {
            useCase = this.injections.listLoginRegistriesUseCase;
        }

        const loginRegistryListResponse = await useCase.execute({user_id, skip, take});

        return loginRegistryListResponse
    }
}