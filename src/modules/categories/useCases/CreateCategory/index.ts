import { InvalidInputsError } from '../../../../shared/graphql/GraphqlErrorDefs/InvalidInputsError';
import { Category } from '../../typeDefs/Category';
import { ICreateCategoryUseCaseDTO } from './ICreateCategory';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    public async execute(data: ICreateCategoryUseCaseDTO): Promise<Category | InvalidInputsError> {
        const invalidInputs = this.validateInput(data)
        if (invalidInputs.length > 0) {
            const error = new InvalidInputsError();
            error.inputs = this.validateInput(data);
            return error;
        }

        return await this.categoriesRepository.create(data);
    }

    private validateInput(data: ICreateCategoryUseCaseDTO): {location: string, message: string}[] {
        const invalidInputs = []
        if (data.name.length > 253) {
            invalidInputs.push({
                location: 'name',
                message: 'max 253 characters'
            })
        }
        
        return invalidInputs
    }
}