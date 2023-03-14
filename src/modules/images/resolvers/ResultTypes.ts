import { createUnionType } from "type-graphql";
import { Image } from "../typeDefs/Image";
import { UnauthorizedError } from "../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError";
import { ImagesPagination } from "../typeDefs/ImagesPagination";


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

export const getImagesResults = createUnionType({
    name: "getImagesResults",
    types: () => [
        ImagesPagination
    ] as const,
    resolveType: value => {
        if (value.model == "imagesPagination") {
            return ImagesPagination;
        }
        undefined;
    }
})