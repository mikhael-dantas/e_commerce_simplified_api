import { ImagesResolver } from './../../../../../src/modules/images/resolvers/index';


// 20FE8C18-31FD-4C7E-A3A4-37DF703A8682

import { randomUUID } from "crypto"

// positionLabel5
test.concurrent(
`resolver for query getImages, retrieve a object with pagination info and a list of images and filter results based on args: skip (optional, default: 0). take (optional, default: 10). orderBy (optional, default: "created_at"). orderDirection (optional, default: "desc"). name (optional). description (optional). tags (optional). userId (optional). image_url (optional).`,
// positionLabel6
// positionLabel7

async () => {
    const mockedListImagesUseCase = {
        execute: jest.fn().mockImplementation((data: any) => {
            return {
                data: [
                    {
                        id: randomUUID(),
                        name: data.data.name,
                        description: data.data.description,
                        tags: data.data.tags,
                        image_url: data.data.image_url,
                        user_id: data.data.user_id,
                        created_at: new Date(),
                    },
                ],
                count: 1,
                cursor: 1,
            }
        })
    }

    const resolver = new ImagesResolver({
        listImagesUseCase: mockedListImagesUseCase as any
    })

    const filters = {
        name: randomUUID(),
        description: randomUUID(),
        tags: [randomUUID(), randomUUID()],
        user_id: randomUUID(),
        image_url: randomUUID(),
    }

    const result = await resolver.getImages(
        0,
        10,
        "created_at",
        "desc",
        filters.name,
        filters.description,
        filters.tags,
        filters.user_id,
        filters.image_url,
    )

    expect(result).toEqual({
        data: [
            {
                id: expect.any(String),
                name: filters.name,
                description: filters.description,
                tags: filters.tags,
                image_url: filters.image_url,
                user_id: filters.user_id,
                created_at: expect.any(Date),
            },
        ],
        count: 1,
        cursor: 1,
    })
}
)
// positionLabel8
// positionLabel1-resolver for query getImages, retrieve a object with pagination info and a list of images and filter results based on args: skip (optional, default: 0). take (optional, default: 10). orderBy (optional, default: "created_at"). orderDirection (optional, default: "desc"). name (optional). description (optional). tags (optional). userId (optional). image_url (optional).-positionLabel2
// 20FE8C18-31FD-4C7E-A3A4-37DF703A8682