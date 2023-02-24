

// FF42A87D-70A4-4074-B1D2-359C9D45E8DC

import { sign } from "jsonwebtoken"
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
            loginRegistryList(skip: 0, take: 2, userId: "1") {
                __typename
                ... on LoginRegistry {
                    id,
                    created_at,
                    user_id
                }
            }
        }
        `
    }


    const response = await JestApiPost(JSON.stringify(query))

    const parsedRes = JSON.parse(response)

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.loginRegistryList).toBeDefined()
    expect(parsedRes.data?.loginRegistryList[0]).toBeDefined()
    expect(parsedRes.data?.loginRegistryList[0]).toHaveProperty('id')
    expect(parsedRes.data?.loginRegistryList[0]).toHaveProperty('created_at')
    expect(parsedRes.data?.loginRegistryList[0]).toHaveProperty('user_id')

}
)
// positionLabel8
// positionLabel1-receive a query for listLoginRegistries(skip: number, take: number, accessToken: string), returning paginated login registries of the user-positionLabel2
// FF42A87D-70A4-4074-B1D2-359C9D45E8DC