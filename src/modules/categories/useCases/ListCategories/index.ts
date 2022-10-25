import { Category } from './../../typeDefs/Category';
import { ICategoriesRepository } from './../../repositories/ICategoriesRepository';
import { IListCategoriesUseCase, IListCategoriesUseCaseDTO } from './IListCategories';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListCategoriesUseCase implements IListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ skip, take }: IListCategoriesUseCaseDTO): Promise<Category[]> {
        const categories = await this.categoriesRepository.list({ skip, take })

        return categories
    }
}