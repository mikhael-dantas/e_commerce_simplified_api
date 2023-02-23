

// FE7146C8-3A1F-4E8F-8B39-C5F0071858B6

import { JestApiPost } from "../../../../../jestTestsUtils";

// positionLabel5
test.concurrent(
"receive a mutation with [state:string] for loginAttempt, and after checking and deleting the record for that state, return operationResponse with status sucess, and if state check don't pass return status fail with the message",
// positionLabel6
// positionLabel7

async () => {
    const QUERY = `
    mutation {
        loginAttempt(state: "test") {
            __typename
            ... on OperationResponse {
                status
                message
            }
        }
    }
    `;

    const response = await JestApiPost(JSON.stringify(QUERY));
    const parsedRes = JSON.parse(response);
    expect(parsedRes).toHaveProperty("data");

    expect(parsedRes.data?.loginAttempt).toBeDefined();
    expect(parsedRes.data?.loginAttempt).toHaveProperty("status");
    expect(parsedRes.data?.loginAttempt).toHaveProperty("message");
    expect(parsedRes.data?.loginAttempt.status).toBe("fail");


    const { redisClient } = global as any;

    await redisClient.set("test", "test");

    const QUERY2 = `
    mutation {
        loginAttempt(state: "test") {
            __typename
            ... on OperationResponse {
                status
                message
            }
        }
    }
    `;

    const response2 = await JestApiPost(JSON.stringify(QUERY2));
    const parsedRes2 = JSON.parse(response2);
    expect(parsedRes2).toHaveProperty("data");
    expect(parsedRes2.data?.loginAttempt).toBeDefined();
    expect(parsedRes2.data?.loginAttempt).toHaveProperty("status");
    expect(parsedRes2.data?.loginAttempt).toHaveProperty("message");
    expect(parsedRes2.data?.loginAttempt.status).toBe("success");

}
)
// positionLabel8
// positionLabel1-receive a mutation with [state:string] for loginAttempt, and after checking and deleting the record for that state, return operationResponse with status sucess, and if state check don't pass return status fail with the message-positionLabel2
// FE7146C8-3A1F-4E8F-8B39-C5F0071858B6