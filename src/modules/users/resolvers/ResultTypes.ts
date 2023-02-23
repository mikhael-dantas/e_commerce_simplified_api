import { createUnionType } from "type-graphql";
import { BlockedErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/BlockedError";
import { State } from "../typeDefs/State";
import { OperationResponse } from "../../../shared/graphql/OperationResponse";


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