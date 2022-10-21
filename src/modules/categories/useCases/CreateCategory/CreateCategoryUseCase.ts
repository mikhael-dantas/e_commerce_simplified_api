import { Category } from './../../typeDefs/Category';
import { ICreateCategoryUseCaseDTO } from './ICreateCategoryUseCase';
import { ICategoriesRepository } from './../../repositories/ICategoriesRepository';
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    public async execute(data: ICreateCategoryUseCaseDTO): Promise<Category> {
        return await this.categoriesRepository.create(data);
    }
}