import { CreateImageUseCase } from './../../../../../src/modules/images/useCases/createImage/index';


// D727BB35-DC63-40C5-8D71-38528DEFDFE3


// positionLabel5
test.concurrent(
'use case for createImage receiving user_id ,name,  description,  tags, and image_url. returns the created image data.',
// positionLabel6
// positionLabel7

async () => {
    const mockedImagesRepositories = { 
        create: jest.fn().mockImplementation(async (data) => {
            return {
                id: 'id',
                name: data.name,
                description: data.description,
                tags: data.tags,
                image_url: data.image_url,
                user_id: data.user_id,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
    }

    const mockedFindUserByIdUseCase = {
        execute: jest.fn().mockImplementation(async (user_id) => {
            return {
                id: 'id',
            }
        })
    }

    const mockedAuthorizeAccessToken = {
        execute: jest.fn().mockImplementation(async (accessToken) => {
            return {
                sub: 'id123',
            }
        })
    }

    const useCase = new CreateImageUseCase(mockedImagesRepositories)


    const image = await useCase.execute({
        data: {
            name: 'name',
            description: 'description',
            tags: ['tag1', 'tag2'],
            image_url: 'image_url',
            accessToken: "accessToken"
        },
        injections: {
            findUserById: mockedFindUserByIdUseCase as any,
            checkAccessToken: mockedAuthorizeAccessToken as any,
        }
    })

    expect(image).toBeDefined()
    expect(image).toHaveProperty('id')
    expect(image).toHaveProperty('name')
    expect(image).toHaveProperty('description')
    expect(image).toHaveProperty('tags')
    expect(image).toHaveProperty('image_url')
    expect(image).toHaveProperty('user_id')
    expect(image).toHaveProperty('created_at')
    expect(image).toHaveProperty('updated_at')
}
)
// positionLabel8
// positionLabel1-use case for createImage receiving user_id ,name,  description,  tags, and image_url. returns the created image data.-positionLabel2
// D727BB35-DC63-40C5-8D71-38528DEFDFE3