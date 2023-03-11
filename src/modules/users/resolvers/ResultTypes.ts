import { UnauthorizedError } from '../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError';
import { createUnionType } from "type-graphql";
import { BlockedError } from "../../../shared/graphql/GraphqlErrorDefs/BlockedError";
import { State } from "../typeDefs/State";
import { OperationResponse } from "../../../shared/graphql/OperationResponse";
import { LoginRegistry } from "../typeDefs/LoginRegistry";


export const LoginAttemptInitResults = createUnionType({
    name: "StateResults",
    types: () => [
        State,
        BlockedError,
        UnauthorizedError
    ] as const,
    resolveType: value => {
        if (value.model == "state") {
            return State;
        }
        if (value.model == "blockedError") {
            return BlockedError;
        }
        if (value.model == "unauthorizedError") {
            return UnauthorizedError;
        }
        undefined;
    }
})

export const LoginAttemptRetrieveResults = createUnionType({
    name: "CheckStateResults",
    types: () => [
        OperationResponse,
        UnauthorizedError
    ] as const,
    resolveType: value => {
        if (value.model == "operationResponse") {
            return OperationResponse;
        }
        if (value.model == "unauthorizedError") {
            return UnauthorizedError;
        }
        undefined;
    }
})

export const LoginRegistrationResults = createUnionType({
    name: "LoginRegistrationResults",
    types: () => [
        LoginRegistry,
        UnauthorizedError
    ] as const,
    resolveType: value => {
        if (value.model == "loginRegistry") {
            return LoginRegistry;
        }
        if (value.model == "unauthorizedError") {
            return UnauthorizedError;
        }
        undefined;
    }
})

export const LoginRegistryListResults = createUnionType({
    name: "LoginRegistryListResults",
    types: () => [
        LoginRegistry,
        UnauthorizedError
    ] as const,
    resolveType: value => {
        if (value.model == "loginRegistry") {
            return LoginRegistry;
        }
        if (value.model == "unauthorizedError") {
            return UnauthorizedError;
        }
        undefined;
    }
})