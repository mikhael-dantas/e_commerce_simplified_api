import { ICategoriesRepository } from '../../../../../src/modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../../../../src/modules/categories/repositories/CategoriesRepository';

// 7C86AF53-F4DF-4A88-840F-1518201F6AB0
// positionLabel5
test.concurrent(
'category repository.create method should create and return category',
// positionLabel6
// positionLabel7


async () => {
    const {mockedPrisma} = global as any
    const categoryRepository: ICategoriesRepository = new CategoriesRepository(mockedPrisma)

    const categoryObjectFields = {
        id: '7C86AF53-F4DF-4A88-840F-1518201F6AB0',
        model: 'category',
        name: 'category name',
        description: 'category description',
        image_id: '7C86AF53-F4DF-4A88-840F-1518201F6AB0',
        image_url: 'category image url',
        inactive: false,
        created_at: new Date(),
        updated_at: new Date(),
    }
    mockedPrisma.category.create.mockImplementationOnce((data: any): any => {
        return {
            id: categoryObjectFields.id,
            model: 'category',
            name: data.data.name,
            description: data.data.description,
            image_id: data.data.image_id,
            image_url: data.data.image_url,
            inactive: data.data.inactive,
            created_at: categoryObjectFields.created_at,
            updated_at: categoryObjectFields.updated_at,
        }
    })

    const category = await categoryRepository.create({
        name: categoryObjectFields.name,
        description: categoryObjectFields.description,
        image_id: categoryObjectFields.image_id,
        image_url: categoryObjectFields.image_url,
        inactive: categoryObjectFields.inactive,
    })

    expect(category).toEqual(categoryObjectFields)

// this code fail was put in here because this test name was eddited
;expect(true).toBe(false);}
)
// positionLabel8
// positionLabel1-category repository.create method should create and return category-positionLabel2
// 7C86AF53-F4DF-4A88-840F-1518201F6AB0