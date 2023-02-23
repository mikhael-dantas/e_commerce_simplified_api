import { createUnionType } from "type-graphql";
import { BlockedErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/BlockedError";
import { State } from "../typeDefs/State";
import { OperationResponse } from "../../../shared/graphql/OperationResponse";
import { LoginRegistry } from "../typeDefs/LoginRegistry";


export const LoginAttemptInitResults = createUnionType({
    name: "StateResults",
    types: () => [
        State,
        BlockedErrorTypeDef
    ] as const,
    resolveType: value => {
        if (value.model == "state") {
            return State;
        }
        if (value.model == "blockedErrorTypeDef") {
            return BlockedErrorTypeDef;
        }
        undefined;
    }
})

export const LoginAttemptRetrieveResults = createUnionType({
    name: "CheckStateResults",
    types: () => [
        OperationResponse
    ] as const,
    resolveType: value => {
        if (value.model == "operationResponse") {
            return OperationResponse;
        }
        undefined;
    }
})

export const LoginRegistrationResults = createUnionType({
    name: "LoginRegistrationResults",
    types: () => [
        LoginRegistry,
    ] as const,
    resolveType: value => {
        if (value.model == "loginRegistry") {
            return LoginRegistry;
        }
        undefined;
    }
})

export const LoginRegistryListResults = createUnionType({
    name: "LoginRegistryListResults",
    types: () => [
        LoginRegistry,
    ] as const,
    resolveType: value => {
        if (value.model == "loginRegistry") {
            return LoginRegistry;
        }
        undefined;
    }
})