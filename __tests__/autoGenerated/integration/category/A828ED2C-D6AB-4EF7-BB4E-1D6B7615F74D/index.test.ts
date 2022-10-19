
// A828ED2C-D6AB-4EF7-BB4E-1D6B7615F74D
// positionLabel5
test.concurrent(
'list all categories',
// positionLabel6
// positionLabel7


async () => {

    const GET_CATEGORIES = `
        query {
            categories(take: 10, skip: 0) {
                __typename
                ...on Category {
                    id,
                    name,
                    description,
                    image_id,
                    image_url,
                    created_at,
                    updated_at,
                }
            }
        }
    `

    const query = {
        query: GET_CATEGORIES,
    }
    
    const {api__} = global as any
    const {prismaClient} = global as any

    prismaClient.category.create({
        data: {
            id: `${Math.random().toString()}${new Date().getTime()}`,
            name: 'test',
            description: 'test',
            image_id: 'test',
            image_url: 'test',
            created_at: new Date(),
            updated_at: new Date(),
        }
    })

    const parsedRes = JSON.parse(await api__.post(JSON.stringify(query)))




    expect(parsedRes.data?.categories).toBeDefined()
    expect(parsedRes.data?.categories[0]).toHaveProperty('id')
    expect(parsedRes.data?.categories[0]).toHaveProperty('name')
    expect(parsedRes.data?.categories[0]).toHaveProperty('description')
    expect(parsedRes.data?.categories[0]).toHaveProperty('image_path')
    expect(parsedRes.data?.categories[0]).toHaveProperty('image_url')
    expect(parsedRes.data?.categories[0]).toHaveProperty('created_at')
    expect(parsedRes.data?.categories[0]).toHaveProperty('updated_at')

}
)
// positionLabel8
// positionLabel1-list all categories-positionLabel2
// A828ED2C-D6AB-4EF7-BB4E-1D6B7615F74D