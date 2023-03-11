import { sign } from "jsonwebtoken"
import { JestApiPost } from "../../../../../jestTestsUtils"

// 9508DE4A-A3AD-4641-99B2-D26A315E9B66
// positionLabel5
test.concurrent(
`mutation for loginRegistration receiving accessToken and the client key, returns a register of the last login from the user, and the user id`,
// positionLabel6
// positionLabel7



async () => {
    const secret = process.env.AUTH0_PUBLIC_KEY
    if (!secret) { throw new Error('No secret found in env') }
    const clientKey = process.env.CLIENT_KEY
    if (!clientKey) { throw new Error('No client key found in env') }

    const token = sign({
        sub: '1',
        name: 'John Doe',},
        secret,
        { algorithm: 'HS256',}
    )

    const mutation = {
        query:`
        mutation {
            loginRegistration(accessToken: "${token}") {
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

    const response = await JestApiPost(JSON.stringify(mutation), {headers: {
        "Content-Type": "application/json",
        'authorization': 'Bearer ' + clientKey
    }})

    const parsedRes = JSON.parse(response)

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.loginRegistration).toBeDefined()
    expect(parsedRes.data?.loginRegistration).toHaveProperty('id')
    expect(parsedRes.data?.loginRegistration).toHaveProperty('created_at')
    expect(parsedRes.data?.loginRegistration).toHaveProperty('user_id')


}
)
// positionLabel8
// positionLabel1-mutation for loginRegistration receiving accessToken and the client key, returns a register of the last login from the user, and the user id-positionLabel2
// 9508DE4A-A3AD-4641-99B2-D26A315E9B66