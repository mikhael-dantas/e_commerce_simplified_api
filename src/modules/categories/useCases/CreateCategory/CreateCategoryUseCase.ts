import { InvalidInputErrorTypeDef } from './../../../../shared/graphql/GraphqlErrorDefs/InvalidInputsError';
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

    public async execute(data: ICreateCategoryUseCaseDTO): Promise<Category | InvalidInputErrorTypeDef> {

        if (!this.validateInput(data)) {
            const error = new InvalidInputErrorTypeDef();
            error.message = 'Invalid input';
            error.location = 'name';
            return error;
        }

        return await this.categoriesRepository.create(data);
    }

    private validateInput(data: ICreateCategoryUseCaseDTO): boolean {
        if (data.name.length > 253) {
            return false
        }

        return true
    }
}