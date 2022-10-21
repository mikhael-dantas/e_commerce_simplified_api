import { Category } from './../../typeDefs/Category';

export interface ICreateCategoryUseCase {
    execute: (data: ICreateCategoryUseCaseDTO) => Promise<Category>
}

export type ICreateCategoryUseCaseDTO = {
    name: string
    description: string
    image_id: string
    image_url: string
    inactive: boolean
}