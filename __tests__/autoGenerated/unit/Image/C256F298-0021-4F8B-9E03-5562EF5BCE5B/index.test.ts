import { TListImagesDTO, TListImagesFilters } from './../../../../../src/modules/images/repositories/interface';
import { randomUUID } from "crypto"
import { ListImagesUseCase } from "../../../../../src/modules/images/useCases/listImages"
import { IImagesRepository } from "../../../../../src/modules/images/repositories/interface"


// C256F298-0021-4F8B-9E03-5562EF5BCE5B
// positionLabel5
test.concurrent(
`use case for ListImages Get a list of images from the database by receiving a set of optional filters, including the ability to skip records (default: 0), limit the number of returned records (default: 10), sort by a column in ascending or descending order (default: desc), search by name or description, filter by tags, user ID, or image URL . The returned list contains all images that match the filter criteria and pages information.`,
// positionLabel6
// positionLabel7

async () => {
    const mockedRepo: Partial<IImagesRepository> = {
        list: jest.fn().mockImplementation((data: TListImagesDTO) => {
            return [
                {
                    id: randomUUID(),
                    name: data.filters.name,
                    description: data.filters.description,
                    tags: data.filters.tags,
                    image_url: data.filters.image_url,
                    user_id: data.filters.user_id,
                    created_at: new Date(),
                },
            ]
        }),
        count: jest.fn().mockImplementation((data: TListImagesFilters) => {
            return 1
        })
    }

    const useCase = new ListImagesUseCase(
        mockedRepo as unknown as IImagesRepository
    )

    const filters = {
        name: randomUUID(),
        description: randomUUID(),
        tags: [randomUUID(), randomUUID()],
        user_id: randomUUID(),
        image_url: randomUUID(),
        skip: 0,
        take: 10,
        orderBy: "created_at",
        orderDirection: "desc",
    }

    const result = await useCase.execute({data: filters})

    expect(result).toEqual({
        model: "imagesPagination",
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
        cursor: 0,
    })
}


)
// positionLabel8
// positionLabel1-use case for ListImages Get a list of images from the database by receiving a set of optional filters, including the ability to skip records (default: 0), limit the number of returned records (default: 10), sort by a column in ascending or descending order (default: desc), search by name or description, filter by tags, user ID, or image URL . The returned list contains all images that match the filter criteria and pages information.-positionLabel2
// C256F298-0021-4F8B-9E03-5562EF5BCE5B