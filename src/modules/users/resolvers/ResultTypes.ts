import { createUnionType } from "type-graphql";
import { BlockedErrorTypeDef } from "../../../shared/graphql/GraphqlErrorDefs/BlockedError";
import { State } from "../typeDefs/State";


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