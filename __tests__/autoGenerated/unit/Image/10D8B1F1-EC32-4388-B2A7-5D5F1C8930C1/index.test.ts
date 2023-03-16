import { randomUUID } from "crypto"
import { CreateMockContext } from "../../../../../jestTestsUtils"
import { ImagesRepository } from "../../../../../src/modules/images/repositories"


// 10D8B1F1-EC32-4388-B2A7-5D5F1C8930C1
// positionLabel5
test.concurrent(
`repo for images.list get a list of images from the database by receiving a set of optional filters, including the ability to skip records, limit the number of returned records, sort by a column in ascending or descending order, search by name or description, filter by tags, user ID, or image URL. The returned list contains all images that match the filter criteria.`,
// positionLabel6
// positionLabel7

async () => {
    const mockedPrisma = CreateMockContext().prisma

    mockedPrisma.image.findMany.mockImplementation((data): any => {
        return [
            {
                id: randomUUID(),
                name: (data?.where?.AND as any).find((item: any) => item?.name)?.name.contains,
                description: (data?.where?.AND as any).find((item: any) => item?.description)?.description.contains,
                tags: (data?.where?.AND as any).find((item: any) => item?.tags)?.tags.array_contains,
                image_url: (data?.where?.AND as any).find((item: any) => item?.image_url)?.image_url.contains,
                user_id: (data?.where?.AND as any).find((item: any) => item?.user_id)?.user_id,
                created_at: new Date(),
            },
        ]
    })

    const repo = new ImagesRepository(
        mockedPrisma as any
    )

    const filters = {
        name: randomUUID(),
        description: randomUUID(),
        tags: [randomUUID(), randomUUID()],
        user_id: randomUUID(),
        image_url: randomUUID(),
    }
    const pagination = {
        skip: 0,
        take: 10,
        orderBy: "created_at",
        orderDirection: "desc",
    }

    const result = await repo.list({filters, pagination})

    console.log("result")
    console.log("result")
    console.log(result)
    console.log("result")
    console.log("result")
    expect(result).toEqual([
        {
            id: expect.any(String),
            name: filters.name,
            description: filters.description,
            tags: filters.tags,
            image_url: filters.image_url,
            user_id: filters.user_id,
            created_at: expect.any(Date),
        },
    ])
}
)
// positionLabel8
// positionLabel1-repo for images.list get a list of images from the database by receiving a set of optional filters, including the ability to skip records, limit the number of returned records, sort by a column in ascending or descending order, search by name or description, filter by tags, user ID, or image URL. The returned list contains all images that match the filter criteria.-positionLabel2
// 10D8B1F1-EC32-4388-B2A7-5D5F1C8930C1