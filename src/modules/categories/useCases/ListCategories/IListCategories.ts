import { Category } from './../../typeDefs/Category';


export interface IListCategoriesUseCase {
    execute: (data: IListCategoriesUseCaseDTO) => Promise<Category[]>
}

export type IListCategoriesUseCaseDTO = {
    skip: number
    take: number
}