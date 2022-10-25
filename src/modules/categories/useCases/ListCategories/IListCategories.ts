import { InvalidInputsError } from './../../../../shared/graphql/GraphqlErrorDefs/InvalidInputsError';
import { Category } from './../../typeDefs/Category';


export interface IListCategoriesUseCase {
    execute: (data: IListCategoriesUseCaseDTO) => Promise<Category[] | InvalidInputsError>
}

export type IListCategoriesUseCaseDTO = {
    skip: number
    take: number
}