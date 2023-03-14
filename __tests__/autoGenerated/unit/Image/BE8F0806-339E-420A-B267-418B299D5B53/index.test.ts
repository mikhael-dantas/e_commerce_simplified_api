import { randomUUID } from 'crypto';
import { ImagesRepository } from './../../../../../src/modules/images/repositories/index';
import { CreateMockContext } from "../../../../../jestTestsUtils"


// BE8F0806-339E-420A-B267-418B299D5B53
// positionLabel5
test.concurrent(
`repo for images.count get a number of images from the database by receiving a set of optional filters, search by name or description, filter by tags, user ID, or image URL. `,
// positionLabel6
// positionLabel7

async () => {
    const mockedPrisma = CreateMockContext().prisma

    mockedPrisma.image.count.mockImplementation((data: any): any => {
        return 1
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

    const result = await repo.count({filters})

    expect(result).toEqual(1)
}
)
// positionLabel8
// positionLabel1-repo for images.count get a number of images from the database by receiving a set of optional filters, search by name or description, filter by tags, user ID, or image URL. -positionLabel2
// BE8F0806-339E-420A-B267-418B299D5B53