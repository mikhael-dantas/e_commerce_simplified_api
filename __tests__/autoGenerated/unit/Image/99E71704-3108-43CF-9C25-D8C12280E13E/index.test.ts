import { ImagesResolver } from './../../../../../src/modules/images/resolvers/index';


// 99E71704-3108-43CF-9C25-D8C12280E13E
// positionLabel5
test.concurrent(
`resolver for mutation createImage receiving client key, user identification and the name:String,  description,  tags      Json array,  image_url    String. and returns the created image data of that user that don't failed the authorization, so the flow is call user authorization, call createImage usecase, and then return the created image data.`,
// positionLabel6
// positionLabel7


async () => {
    const mockedUseCase = {
        execute: jest.fn().mockImplementation(async (data) => {
            return {
                id: 'id',
                name: data.name,
                description: data.description,
                tags: data.tags,
                image_url: data.image_url,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
    }

    const resolver = new ImagesResolver({
        createImageUseCase: mockedUseCase as any,
    })

    const image = await resolver.createImage(
        "token",
        "name",
        "description",
        "image_url",
        ["tag1", "tag2"],
    )

    expect(image).toBeDefined()
    expect(image).toHaveProperty('id')
    expect(image).toHaveProperty('name')
    expect(image).toHaveProperty('description')
    expect(image).toHaveProperty('tags')
    expect(image).toHaveProperty('image_url')
    expect(image).toHaveProperty('created_at')
    expect(image).toHaveProperty('updated_at')
}
)
// positionLabel8
// positionLabel1-resolver for mutation createImage receiving client key, user identification and the name:String,  description,  tags      Json array,  image_url    String. and returns the created image data of that user that don't failed the authorization, so the flow is call user authorization, call createImage usecase, and then return the created image data.-positionLabel2
// 99E71704-3108-43CF-9C25-D8C12280E13E