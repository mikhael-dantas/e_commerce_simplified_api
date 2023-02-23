

// 9508DE4A-A3AD-4641-99B2-D26A315E9B66

import { JestApiPost } from "../../../../../jestTestsUtils"

// positionLabel5
test.concurrent(
'must receive a mutation with (accessToken: string) parameter for loginRegistration, and after storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don\'t, create a user in the database with that id. then, returns a register of the last login from the user, and the user id',
// positionLabel6
// positionLabel7

async () => {
    const mutation = {
        mutation:`
        mutation {
            loginRegistration(accessToken: "string") {
                __typename
                ... on LoginRegistration {
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

    const response = await JestApiPost(JSON.stringify(mutation))

    const parsedRes = JSON.parse(response)

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.loginRegistration).toBeDefined()
    expect(parsedRes.data?.loginRegistration[0]).toBeDefined()
    expect(parsedRes.data?.loginRegistration[0]).toHaveProperty('id')
    expect(parsedRes.data?.loginRegistration[0]).toHaveProperty('date')
    expect(parsedRes.data?.loginRegistration[0]).toHaveProperty('user')
    expect(parsedRes.data?.loginRegistration[0].user).toHaveProperty('id')
}
)
// positionLabel8
// positionLabel1-must receive a mutation with (accessToken: string) parameter for loginRegistration, and after storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don't, create a user in the database with that id. then, returns a register of the last login from the user, and the user id-positionLabel2
// 9508DE4A-A3AD-4641-99B2-D26A315E9B66