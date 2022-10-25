
import { JestApiPost } from "../../../../../jestTestsUtils"


// F31793C7-CA2E-4B58-975E-3F1B2D42B8A8
// positionLabel5
test.concurrent(
'mutation createCategory(name: string, description: string, image_id: string. image_url: string, inactive: boolean) should create a category',
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
                inactive: false
            ) {
                __typename
                ...on Category {
                    id,
                    name,
                    description,
                    image_id,
                    image_url,
                    inactive,
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
        query: CREATE_CATEGORY,
    }

    const parsedRes = JSON.parse(await JestApiPost(JSON.stringify(query)))

    expect(parsedRes.data?.createCategory).toBeDefined()
    expect(parsedRes.data?.createCategory).toHaveProperty('id')
    expect(parsedRes.data?.createCategory).toHaveProperty('name')
    expect(parsedRes.data?.createCategory).toHaveProperty('description')
    expect(parsedRes.data?.createCategory).toHaveProperty('image_id')
    expect(parsedRes.data?.createCategory).toHaveProperty('image_url')
    expect(parsedRes.data?.createCategory).toHaveProperty('inactive')
    expect(parsedRes.data?.createCategory).toHaveProperty('created_at')
    expect(parsedRes.data?.createCategory).toHaveProperty('updated_at')



}
)
// positionLabel8
// positionLabel1-mutation createCategory(name: string, description: string, image_id: string. image_url: string, inactive: boolean) should create a category-positionLabel2
// F31793C7-CA2E-4B58-975E-3F1B2D42B8A8