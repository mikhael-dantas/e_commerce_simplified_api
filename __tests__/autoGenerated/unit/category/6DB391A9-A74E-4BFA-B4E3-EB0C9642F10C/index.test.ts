import { InvalidInputErrorTypeDef } from './../../../../../src/shared/graphql/GraphqlErrorDefs/InvalidInputsError';
import { CreateCategoryUseCase } from './../../../../../src/modules/categories/useCases/CreateCategory/CreateCategoryUseCase';
import { ICreateCategoryUseCase, ICreateCategoryUseCaseDTO } from './../../../../../src/modules/categories/useCases/CreateCategory/ICreateCategoryUseCase';
import { CategoriesResolver } from './../../../../../src/modules/categories/resolvers/index';


// 6DB391A9-A74E-4BFA-B4E3-EB0C9642F10C
// positionLabel5
test.concurrent(
'category resolver.create should return the created category or a defined error by passing name, description, image_id, image_url, inactive, and return the category with additional id, created_at and updated_at',
// positionLabel6
// positionLabel7

async () => {
    const categoryFields = {
        id: '6DB391A9-A74E-4BFA-B4E3-EB0C9642F10C',
        model: 'category',
        name: "example name",
        description: "example description",
        image_id: "example image_id",
        image_url: "example image_url",
        inactive: false,
        created_at: new Date(),
        updated_at: new Date(),
    }
    const mockCreateCategoryUseCase: jest.Mocked<ICreateCategoryUseCase> = {
        execute: jest.fn(
            async (data: ICreateCategoryUseCaseDTO) => {
                return {
                    id: categoryFields.id,
                    model: categoryFields.model,
                    name: data.name,
                    description: data.description,
                    image_id: data.image_id,
                    image_url: data.image_url,
                    inactive: data.inactive,
                    created_at: categoryFields.created_at,
                    updated_at: categoryFields.updated_at,
                }
            }
        ),
    };
    const categoriesResolver = new CategoriesResolver({createCategoryUseCase: mockCreateCategoryUseCase as unknown as CreateCategoryUseCase});

    const result = await categoriesResolver.createCategory(
        categoryFields.name,
        categoryFields.description,
        categoryFields.image_id,
        categoryFields.image_url,
        categoryFields.inactive,
    );

    expect(result).toEqual(categoryFields);

    mockCreateCategoryUseCase.execute = jest.fn(
        async (data: ICreateCategoryUseCaseDTO) => {
            const errorToReturn = new InvalidInputErrorTypeDef()
            errorToReturn.message = 'example error message'
            errorToReturn.location = 'example error location'
            return errorToReturn
        }
    );

    const result2 = await categoriesResolver.createCategory(
        categoryFields.name,
        categoryFields.description,
        categoryFields.image_id,
        categoryFields.image_url,
        categoryFields.inactive,
    );

    expect(result2).toBeInstanceOf(InvalidInputErrorTypeDef);

    const {message, location} = result2 as InvalidInputErrorTypeDef

    expect(message).toEqual('example error message')
    expect(location).toEqual('example error location')

}
)
// positionLabel8
// positionLabel1-category resolver.create should return the created category or a defined error by passing name, description, image_id, image_url, inactive, and return the category with additional id, created_at and updated_at-positionLabel2
// 6DB391A9-A74E-4BFA-B4E3-EB0C9642F10C