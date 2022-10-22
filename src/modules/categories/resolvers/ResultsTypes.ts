import { InvalidInputErrorTypeDef } from "@root/src/shared/graphql/GraphqlErrorDefs/InvalidInputsError";
import { createUnionType } from "type-graphql";
import { Category } from "../typeDefs/Category";

export const CreateCategoryResults = createUnionType({
    name: "CreateCategoryResults",
    types: () => [
        Category,
        InvalidInputErrorTypeDef
    ] as const,  
    resolveType: value => {
        if (value.model == "category") {
            return Category;
        }
        if (value instanceof InvalidInputErrorTypeDef) {
            return InvalidInputErrorTypeDef;
        }
        undefined;
    },
})