
import { JestApiPost } from "../../../../../jestTestsUtils"

// EFA95598-0270-4999-87C9-96C33A4DA8E5
// positionLabel5
test.concurrent(
'receive a query for loginAttempt and returns the state for the attempt, and the expiration time for it',
// positionLabel6
// positionLabel7

async () => {
    
    const GET_STATE = `
    query {
        loginAttemptInit {
            __typename
            ... on State {
                state
                expiration
            }
            ... on BlockedErrorTypeDef {
                message
            }
        }
    }
    `
    const query = {
        query: GET_STATE,
    }
    // const {prismaClient} = global as any
    const parsedRes = JSON.parse(await JestApiPost(JSON.stringify(query)))

    expect(parsedRes).toHaveProperty('data')
    expect(parsedRes.data?.loginAttemptInit).toBeDefined()
    expect(parsedRes.data?.loginAttemptInit).toHaveProperty('state')
    expect(parsedRes.data?.loginAttemptInit).toHaveProperty('expiration')

}
)
// positionLabel8
// positionLabel1-receive a query for loginAttempt and returns the state for the attempt, and the expiration time for it-positionLabel2
// EFA95598-0270-4999-87C9-96C33A4DA8E5