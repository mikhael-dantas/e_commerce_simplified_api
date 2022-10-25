import { CreateMockContext } from '../../../../../jestTestsUtils';
import { CategoriesRepository } from './../../../../../src/modules/categories/repositories/CategoriesRepository';


// 128F80F8-50D5-4AC3-8077-7C9B2716C700
// positionLabel5
test.concurrent(
'category repository.list should list categories by amount',
// positionLabel6
// positionLabel7

async () => {
    const mockedPrisma = CreateMockContext().prisma
    const arrayOfCategories = [
        {
            id: '1',
            model: 'Category',
            name: 'category1',
            description: 'description1',
            image_id: 'image_id1',
            image_url: 'image_url1',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '2',
            model: 'Category',
            name: 'category2',
            description: 'description2',
            image_id: 'image_id2',
            image_url: 'image_url2',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '3',
            model: 'Category',
            name: 'category3',
            description: 'description3',
            image_id: 'image_id3',
            image_url: 'image_url3',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '4',
            model: 'Category',
            name: 'category4',
            description: 'description4',
            image_id: 'image_id4',
            image_url: 'image_url4',
            inactive: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]

    mockedPrisma.category.findMany.mockImplementation((data: any): any => {
        return Promise.resolve(arrayOfCategories.slice(data.skip, data.skip + data.take))
    })

    const categoriesRepository = new CategoriesRepository(mockedPrisma);
    
    const categories1 = await categoriesRepository.list({skip: 0, take: 2})
    const categories2 = await categoriesRepository.list({skip: 2, take: 2})
    const categories3 = await categoriesRepository.list({skip: 6, take: 300})

    expect(categories1).toEqual(arrayOfCategories.slice(0, 2))
    expect(categories2).toEqual(arrayOfCategories.slice(2, 4))
    expect(categories3).toEqual([])
}
)
// positionLabel8
// positionLabel1-category repository.list should list categories by amount-positionLabel2
// 128F80F8-50D5-4AC3-8077-7C9B2716C700