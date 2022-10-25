import { Category } from './../../../../../src/modules/categories/typeDefs/Category';
import { InvalidInputsError } from './../../../../../src/shared/graphql/GraphqlErrorDefs/InvalidInputsError';
import { ListCategoriesUseCase } from './../../../../../src/modules/categories/useCases/ListCategories/index';


// 5EA1076C-F495-474A-B9B9-8CB3EF6BC1E8
// positionLabel5
test.concurrent(
'use case for categories list should return defined error if take number is more than 1000',
// positionLabel6
// positionLabel7

async () => {
    const mockedCategoriesRepository: jest.Mocked<any> = {
        list: jest.fn(
            (take: number, skip: number): Promise<Category[]> => {
                return Promise.resolve([])
            }
        ),
    }

    const listCategoriesUseCase = new ListCategoriesUseCase(mockedCategoriesRepository)

    const errorExample = new InvalidInputsError()
    errorExample.inputs = [
        {location: 'take', message: 'number must be between 1~1000'},
    ]

    const response = await listCategoriesUseCase.execute({skip: 0, take: 1001})

    expect(response[0]).toMatchObject(errorExample)
    const {inputs} = (response as InvalidInputsError[])[0]

    expect(inputs[0]?.location).toBe('take')
}
)
// positionLabel8
// positionLabel1-use case for categories list should return defined error if take number is more than 1000-positionLabel2
// 5EA1076C-F495-474A-B9B9-8CB3EF6BC1E8