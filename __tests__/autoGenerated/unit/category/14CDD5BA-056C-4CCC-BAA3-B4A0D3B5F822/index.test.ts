import { InvalidInputErrorTypeDef } from './../../../../../src/shared/graphql/GraphqlErrorDefs/InvalidInputsError';
import { CreateCategoryUseCase } from './../../../../../src/modules/categories/useCases/CreateCategory/CreateCategoryUseCase';
import { Category } from './../../../../../src/modules/categories/typeDefs/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './../../../../../src/modules/categories/repositories/ICategoriesRepository';

// 14CDD5BA-056C-4CCC-BAA3-B4A0D3B5F822
// positionLabel5
test.concurrent(
'usecase for create category must return defined error if name input is invalid by having more than 253 characters ',
// positionLabel6
// positionLabel7


async () => {
    const categoryObjectFields = {
        id: '14CDD5BA-056C-4CCC-BAA3-B4A0D3B5F822',
        model: 'category',
        name: "a".repeat(254),
        description: 'category description',
        image_id: '14CDD5BA-056C-4CCC-BAA3-B4A0D3B5F822',
        image_url: 'category image url',
        inactive: false,
        created_at: new Date(),
        updated_at: new Date(),
    }
    const mockCategoriesRepository: jest.Mocked<ICategoriesRepository> = {
        create: jest.fn(
            (data: ICreateCategoryDTO): Promise<Category> => {
                return Promise.resolve({
                    id: categoryObjectFields.id,
                    model: 'category',
                    name: data.name,
                    description: data.description,
                    image_id: data.image_id,
                    image_url: data.image_url,
                    inactive: data.inactive,
                    created_at: categoryObjectFields.created_at,
                    updated_at: categoryObjectFields.updated_at,
                })
            }
        ),
    }

    const createCategoryUseCase = new CreateCategoryUseCase(mockCategoriesRepository)
    const returnedObject = await createCategoryUseCase.execute({
        name: categoryObjectFields.name,
        description: categoryObjectFields.description,
        image_id: categoryObjectFields.image_id,
        image_url: categoryObjectFields.image_url,
        inactive: categoryObjectFields.inactive,
    })

    const {location} = returnedObject as InvalidInputErrorTypeDef

    expect(returnedObject).toBeInstanceOf(InvalidInputErrorTypeDef)
    expect(returnedObject).toHaveProperty('message')
    expect(returnedObject).toHaveProperty('location')
    expect(location).toBe('name')
}
)
// positionLabel8
// positionLabel1-usecase for create category must return defined error if name input is invalid by having more than 253 characters -positionLabel2
// 14CDD5BA-056C-4CCC-BAA3-B4A0D3B5F822