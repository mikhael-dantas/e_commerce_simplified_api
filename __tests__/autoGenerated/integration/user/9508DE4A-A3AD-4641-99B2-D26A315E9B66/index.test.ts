import { sign } from "jsonwebtoken"
import { JestApiPost } from "../../../../../jestTestsUtils"

// 9508DE4A-A3AD-4641-99B2-D26A315E9B66
// positionLabel5
test.concurrent(
`must receive a mutation with (accessToken: string) parameter for loginRegistration, and after storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don't, create a user in the database with that id. then, returns a register of the last login from the user, and the user id`,
// positionLabel6
// positionLabel7


async () => {
    const secret = process.env.AUTH0_JWT_SECRET_TEST
    if (!secret) { throw new Error('No secret found in env') }
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

    const response = await JestApiPost(JSON.stringify(mutation))

    const parsedRes = JSON.parse(response)

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.loginRegistration).toBeDefined()
    expect(parsedRes.data?.loginRegistration).toHaveProperty('id')
    expect(parsedRes.data?.loginRegistration).toHaveProperty('created_at')
    expect(parsedRes.data?.loginRegistration).toHaveProperty('user_id')

}
)
// positionLabel8
// positionLabel1-must receive a mutation with (accessToken: string) parameter for loginRegistration, and after storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don't, create a user in the database with that id. then, returns a register of the last login from the user, and the user id-positionLabel2
// 9508DE4A-A3AD-4641-99B2-D26A315E9B66