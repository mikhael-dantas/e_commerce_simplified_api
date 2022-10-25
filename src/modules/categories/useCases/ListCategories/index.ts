import { Category } from './../../typeDefs/Category';
import { ICategoriesRepository } from './../../repositories/ICategoriesRepository';
import { IListCategoriesUseCase, IListCategoriesUseCaseDTO } from './IListCategories';
import { inject, injectable } from 'tsyringe';
import { InvalidInputsError } from '../../../../shared/graphql/GraphqlErrorDefs/InvalidInputsError';


@injectable()
export class ListCategoriesUseCase implements IListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ skip, take }: IListCategoriesUseCaseDTO): Promise<Category[] | InvalidInputsError[]> {

        const invalidInputs = this.validateInputs({ skip, take })

        if (invalidInputs.length > 0) {
            const error = new InvalidInputsError()
            error.inputs = invalidInputs
            return [error]
        }

        const categories = await this.categoriesRepository.list({ skip, take })

        return categories
    }

    private validateInputs({ skip, take }: IListCategoriesUseCaseDTO) {
        const invalidInputs = []
        if (take > 1000 || take < 1) {
            invalidInputs.push({ location: 'take', message: 'number must be between 1~1000' })
        }

        return invalidInputs
    }
}