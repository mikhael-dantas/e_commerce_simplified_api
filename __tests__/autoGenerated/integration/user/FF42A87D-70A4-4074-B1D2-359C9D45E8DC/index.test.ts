

// FF42A87D-70A4-4074-B1D2-359C9D45E8DC

import { JestApiPost } from "../../../../../jestTestsUtils"

// positionLabel5
test.concurrent(
'receive a query for listLoginRegistries(skip: number, take: number, accessToken: string), returning paginated login registries of the user',
// positionLabel6
// positionLabel7

async () => {
    const query = {
        query:`
        query {
            listLoginRestries() {
                __typename
                ... on LoginRegistry {
                    id,
                    date,
                    user {
                        id
                    }
                }
            }
        }
        `
    }

    const response = await JestApiPost(JSON.stringify(query))

    const parsedRes = JSON.parse(response)

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.listLoginRestries).toBeDefined()
    expect(parsedRes.data?.listLoginRestries[0]).toBeDefined()
    expect(parsedRes.data?.listLoginRestries[0]).toHaveProperty('id')
    expect(parsedRes.data?.listLoginRestries[0]).toHaveProperty('date')
    expect(parsedRes.data?.listLoginRestries[0]).toHaveProperty('user')
    expect(parsedRes.data?.listLoginRestries[0].user).toHaveProperty('id')

}
)
// positionLabel8
// positionLabel1-receive a query for listLoginRegistries(skip: number, take: number, accessToken: string), returning paginated login registries of the user-positionLabel2
// FF42A87D-70A4-4074-B1D2-359C9D45E8DC