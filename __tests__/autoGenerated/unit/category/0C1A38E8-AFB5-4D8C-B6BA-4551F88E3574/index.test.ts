import { CategoriesResolver } from './../../../../../src/modules/categories/resolvers/index';
import { IListCategoriesUseCaseDTO } from './../../../../../src/modules/categories/useCases/ListCategories/IListCategories';


// 0C1A38E8-AFB5-4D8C-B6BA-4551F88E3574
// positionLabel5
test.concurrent(
'resolver for categories list should return a defined error or a list of categories by passing skip and take',
// positionLabel6
// positionLabel7

async () => {
    const options = {
        skip: 0,
        take: 10,
    };

    const mockedCategories = [
        {
            id: '6DB391A9-A74E-4BFA-B4E3-EB0C9642F10C',
            model: 'category',
            name: 'example name',
            description: 'example description',
            image_id: 'example image_id',
            image_url: 'example image_url',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '6DB391A9-A74E-4BFA-B4E3-EB2C9642F10C',
            model: 'category',
            name: 'example name',
            description: 'example description',
            image_id: 'example image_id',
            image_url: 'example image_url',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]
    const mockedListCategoriesUseCase = jest.mocked<any>({
        execute: jest.fn(
            async (data: IListCategoriesUseCaseDTO) => {
                expect(data.skip).toBe(options.skip);
                expect(data.take).toBe(options.take);
                return mockedCategories;
            }
        )
    });

    const resolver = new CategoriesResolver({
        listCategoriesUseCase: mockedListCategoriesUseCase,
    })

    const response = await resolver.categories(options.skip, options.take);

    expect(response).toEqual(mockedCategories);
}
)
// positionLabel8
// positionLabel1-resolver for categories list should return a defined error or a list of categories by passing skip and take-positionLabel2
// 0C1A38E8-AFB5-4D8C-B6BA-4551F88E3574