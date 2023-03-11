import { createUnionType } from "type-graphql";
import { Image } from "../typeDefs/Image";
import { UnauthorizedError } from "../../../shared/graphql/GraphqlErrorDefs/UnauthorizedTokenError";


export const createImageResults = createUnionType({
    name: "createImageResults",
    types: () => [
        Image,
        UnauthorizedError
    ] as const,
    resolveType: value => {
        if (value.model == "image") {
            return Image;
        }
        if (value.model == "unauthorizedError") {
            return UnauthorizedError;
        }
        undefined;
    }
})