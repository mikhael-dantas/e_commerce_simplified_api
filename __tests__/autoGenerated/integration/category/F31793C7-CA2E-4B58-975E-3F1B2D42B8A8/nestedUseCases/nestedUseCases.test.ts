import { JestApiPost } from "../../../../../../jestTestsUtils"

// 9CA11B02-C481-46CC-B300-E25DB8FC37F9
// positionLabel5
test.concurrent(
'should return defined error if any inputs are invalid ',
// positionLabel6
// positionLabel7

async () => {
    const CREATE_CATEGORY = `
        mutation {
            createCategory(
                name: "${"a".repeat(256)}",
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

    expect(parsedRes.data?.createCategory.__typename).toBe('InvalidInputsError')
    expect(parsedRes.data?.createCategory.inputs.length).toBe(1)
    expect(parsedRes.data?.createCategory.inputs[0].location).toBe('name')
    expect(parsedRes.data?.createCategory.inputs[0].message).toBeDefined()
}
)
// positionLabel8
// positionLabel1-should return defined error if any inputs are invalid -positionLabel2
// 9CA11B02-C481-46CC-B300-E25DB8FC37F9