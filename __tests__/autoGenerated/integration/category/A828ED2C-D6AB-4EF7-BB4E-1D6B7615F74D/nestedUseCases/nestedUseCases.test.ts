import { JestApiPost } from "../../../../../../jestTestsUtils"
// 7B6F45C8-0348-4203-8795-1C2D9AD9DF69
// positionLabel5
test.concurrent(
'categories(skip: number, take: number) should return defined error if take number is more than 1000',
// positionLabel6
// positionLabel7

async () => {
    const GET_CATEGORIES = `
        query {
            categories(skip: 3, take: 1001) {
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
    
    const parsedRes = JSON.parse(await JestApiPost(JSON.stringify(query)))


    expect(parsedRes.data?.categories[0]?.__typename).toBe('InvalidInputsError')
    expect(parsedRes.data?.categories[0]?.inputs[0]?.location).toBe('take')
    
}
)
// positionLabel8
// positionLabel1-categories(skip: number, take: number) should return defined error if take number is more than 1000-positionLabel2
// 7B6F45C8-0348-4203-8795-1C2D9AD9DF69