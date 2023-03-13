

// AD991A1F-503E-4274-992D-4C03F4985770

import { CreateImageUseCase } from "../../../../../src/modules/images/useCases/createImage"

// positionLabel5
test.concurrent(
`use case for createImage receiving a valid token but without needed permissions. returns unauthorizedError.`,
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
            throw new Error('unauthorized permissions')
        })
    }

    const useCase = new CreateImageUseCase(mockedImagesRepositories)


    const image = await useCase.execute({
        data: {
            name: 'name',
            description: 'description',
            tags: ['tag1', 'tag2'],
            image_url: 'image_url',
            accessToken: "accessToken",
        },
        injections: {
            findUserById: mockedFindUserByIdUseCase as any,
            checkAccessToken: mockedAuthorizeAccessToken as any,
        }
    })

    expect(image).toBeDefined()
    expect(image).toHaveProperty('model')
    expect(image.model).toBe('unauthorizedError')
    expect(image).toHaveProperty('message')

}
)
// positionLabel8
// positionLabel1-use case for createImage receiving a valid token but without needed permissions. returns unauthorizedError.-positionLabel2
// AD991A1F-503E-4274-992D-4C03F4985770