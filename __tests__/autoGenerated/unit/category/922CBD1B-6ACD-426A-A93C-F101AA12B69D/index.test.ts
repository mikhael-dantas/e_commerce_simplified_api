import { ListCategoriesUseCase } from './../../../../../src/modules/categories/useCases/ListCategories/index';


// 922CBD1B-6ACD-426A-A93C-F101AA12B69D
// positionLabel5
test.concurrent(
'use case for categories list must  must return the listed categories if inputs are valid',
// positionLabel6
// positionLabel7

async () => {
    const myArgs = {
        skip: 1,
        take: 3,
    }
    const mockedCategoriesRepository: jest.Mocked<any> = {
        list: jest.fn(
            (data: {
                skip: number,
                take: number,
            }): Promise<any> => {
                return Promise.resolve([{skip: data.skip, take: data.take}])
            }
        ),
    }

    const listCategoriesUseCase = new ListCategoriesUseCase(mockedCategoriesRepository)

    const categories = await listCategoriesUseCase.execute(
        myArgs
    )

    expect(categories).toEqual([{skip: myArgs.skip, take: myArgs.take}])
    expect(mockedCategoriesRepository.list).toHaveBeenCalledTimes(1)
}
)
// positionLabel8
// positionLabel1-use case for categories list must  must return the listed categories if inputs are valid-positionLabel2
// 922CBD1B-6ACD-426A-A93C-F101AA12B69D