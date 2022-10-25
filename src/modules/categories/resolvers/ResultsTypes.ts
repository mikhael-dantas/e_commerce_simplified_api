import { createUnionType } from "type-graphql";
import { InvalidInputsError } from "../../../shared/graphql/GraphqlErrorDefs/InvalidInputsError";
import { Category } from "../typeDefs/Category";

export const CreateCategoryResults = createUnionType({
    name: "CreateCategoryResults",
    types: () => [
        Category,
        InvalidInputsError
    ] as const,  
    resolveType: value => {
        if (value.model == "category") {
            return Category;
        }
        if (value.model == "InvalidInputsError") {
            return InvalidInputsError;
        }
        undefined;
    },
})

export const CategoriesResults = createUnionType({
    name: "CategoriesResults",
    types: () => [
        Category,
        InvalidInputsError
    ] as const,
    resolveType: value => {
        if (value.model == "category") {
            return Category;
        }
        if (value.model == "InvalidInputsError") {
            return InvalidInputsError;
        }
        undefined;
    }
})