import { PrismaClient } from '@prisma/client'
import { JestApiPost } from '../../../../../jestTestsUtils'

// A828ED2C-D6AB-4EF7-BB4E-1D6B7615F74D
// positionLabel5
test.concurrent(
'query categories(skip: number, take: number) should list paginated categories',
// positionLabel6
// positionLabel7



async () => {

    const GET_CATEGORIES = `
        query {
            categories(skip: 3, take: 3) {
                __typename
                ...on Category {
                    id,
                    model,
                    name,
                    description,
                    image_id,
                    image_url,
                    created_at,
                    updated_at,
                }
                ...on InvalidInputsError {
                    inputs {
                        location,
                        message,
                    }
                }
            }
        }
    `

    const query = {
        query: GET_CATEGORIES,
    }

    const prismaClient = new PrismaClient()

    // create category 11 times
    async function createOnecategory() {
        await prismaClient.category.create({
            data: {
                id: `${Math.random().toString()}${new Date().getTime()}`,
                name: `${Math.random().toString()}${new Date().getTime()}`,
                description: 'test',
                image_id: 'test',
                image_url: 'test',
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
    }

    for (let i = 0; i < 11; i++) {
        await createOnecategory()
    }

    await prismaClient.$disconnect()

    const parsedRes = JSON.parse(await JestApiPost(JSON.stringify(query)))

    expect(parsedRes.data?.categories).toBeDefined()
    expect(parsedRes.data?.categories[0]).toHaveProperty('__typename')
    expect(parsedRes.data?.categories[0]).toHaveProperty('id')
    expect(parsedRes.data?.categories[0]).toHaveProperty('model')
    expect(parsedRes.data?.categories[0]).toHaveProperty('name')
    expect(parsedRes.data?.categories[0]).toHaveProperty('description')
    expect(parsedRes.data?.categories[0]).toHaveProperty('image_id')
    expect(parsedRes.data?.categories[0]).toHaveProperty('image_url')
    expect(parsedRes.data?.categories[0]).toHaveProperty('created_at')
    expect(parsedRes.data?.categories[0]).toHaveProperty('updated_at')

    expect(parsedRes.data?.categories).toHaveLength(3)
}
)
// positionLabel8
// positionLabel1-query categories(skip: number, take: number) should list paginated categories-positionLabel2
// A828ED2C-D6AB-4EF7-BB4E-1D6B7615F74D