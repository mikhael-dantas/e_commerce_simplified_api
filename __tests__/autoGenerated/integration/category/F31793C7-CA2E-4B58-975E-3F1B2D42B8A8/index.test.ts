// F31793C7-CA2E-4B58-975E-3F1B2D42B8A8
// positionLabel5
test(
'create a category',
// positionLabel6
// positionLabel7

async () => {
    const CREATE_CATEGORY = `
        mutation {
            createCategory(
                name: "test category",
                description: "test description",
                image_id: "test image id",
                image_url: "test image url",
            ) {
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
        query: CREATE_CATEGORY,
    }

    const {api__} = global as any
    const parsedRes = JSON.parse(await api__.post(JSON.stringify(query)))

    expect(parsedRes.data?.createCategory).toBeDefined()
    expect(parsedRes.data?.createCategory).toHaveProperty('id')
    expect(parsedRes.data?.createCategory).toHaveProperty('name')
    expect(parsedRes.data?.createCategory).toHaveProperty('description')
    expect(parsedRes.data?.createCategory).toHaveProperty('image_path')
    expect(parsedRes.data?.createCategory).toHaveProperty('image_url')
    expect(parsedRes.data?.createCategory).toHaveProperty('created_at')
    expect(parsedRes.data?.createCategory).toHaveProperty('updated_at')
}


)
// positionLabel8
// positionLabel1-create a category-positionLabel2
// F31793C7-CA2E-4B58-975E-3F1B2D42B8A8