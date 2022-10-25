import { CreateCategoryUseCase } from './../../../../../src/modules/categories/useCases/CreateCategory/';
import { Category } from './../../../../../src/modules/categories/typeDefs/Category';
import { ICreateCategoryDTO } from './../../../../../src/modules/categories/repositories/ICategoriesRepository';

// DEC3158F-27EE-43FD-B982-8767F0E788AA
// positionLabel5
test.concurrent(
'use case for create category must return the category created if inputs are valid',
// positionLabel6
// positionLabel7

async () => {
    const categoryObjectFields = {
        id: 'DEC3158F-27EE-43FD-B982-8767F0E788AA',
        model: 'category',
        name: 'category name',
        description: 'category description',
        image_id: 'DEC3158F-27EE-43FD-B982-8767F0E788AA',
        image_url: 'category image url',
        inactive: false,
        created_at: new Date(),
        updated_at: new Date(),
    }
    const mockCategoriesRepository: jest.Mocked<any> = {
        create: jest.fn(
            (data: ICreateCategoryDTO): Promise<Category> => {
                const categoryScoped = {
                    id: categoryObjectFields.id,
                    model: 'category',
                    name: data.name,
                    description: data.description,
                    image_id: data.image_id,
                    image_url: data.image_url,
                    inactive: data.inactive,
                    created_at: categoryObjectFields.created_at,
                    updated_at: categoryObjectFields.updated_at,
                }
                return Promise.resolve(categoryScoped)
            }
        ),
    }

    const createCategoryUseCase = new CreateCategoryUseCase(mockCategoriesRepository)

    const category = await createCategoryUseCase.execute({
        name: categoryObjectFields.name,
        description: categoryObjectFields.description,
        image_id: categoryObjectFields.image_id,
        image_url: categoryObjectFields.image_url,
        inactive: categoryObjectFields.inactive,
    })

    expect(category).toEqual(categoryObjectFields)
}
)
// positionLabel8
// positionLabel1-use case for create category must return the category created if inputs are valid-positionLabel2
// DEC3158F-27EE-43FD-B982-8767F0E788AA