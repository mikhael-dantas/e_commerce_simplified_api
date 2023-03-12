import { Redis } from "ioredis";
import { JestApiPost } from "../../../../../jestTestsUtils";

// FE7146C8-3A1F-4E8F-8B39-C5F0071858B6
// positionLabel5
test.concurrent(
'receive a mutation with [state:string] for loginAttemptRetrieve, and after checking and deleting the record for that state, return operationResponse with status sucess, and if state check don\'t pass return status fail with the message',
// positionLabel6
// positionLabel7


async () => {
    const RETRIEVE_STATE = `
    mutation {
        loginAttemptRetrieve(state: "test") {
            __typename
            ... on OperationResponse {
                status
                message
            }
        }
    }
    `;

    const query = {
        query: RETRIEVE_STATE,
    }

    const clientKey = process.env.CLIENT_KEY;
    if (!clientKey) { throw new Error("CLIENT_KEY is not defined"); }

    const response = await JestApiPost(JSON.stringify(query), {
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + clientKey
        }
    });
    const parsedRes = JSON.parse(response);
    expect(parsedRes).toHaveProperty("data");

    expect(parsedRes.data?.loginAttemptRetrieve).toBeDefined();
    expect(parsedRes.data?.loginAttemptRetrieve).toHaveProperty("status");
    expect(parsedRes.data?.loginAttemptRetrieve).toHaveProperty("message");
    expect(parsedRes.data?.loginAttemptRetrieve.status).toBe("fail");


    async function injectData() {
        const redisPort = process.env.REDIS_PORT;
        const redisHost = process.env.REDIS_HOST;
        if (!redisPort || !redisHost) {
            throw new Error("REDIS_PORT or REDIS_HOST is not defined");
        }
        const redisOptions = {
            port: parseInt(redisPort),
            host: redisHost 
        }
        const redisClient = new Redis(redisOptions);
        await redisClient.set("test", "test");
        await redisClient.quit();
    }
    await injectData();


    const RETRIEVE_STATE2 = `
    mutation {
        loginAttemptRetrieve(state: "test") {
            __typename
            ... on OperationResponse {
                status
                message
            }
        }
    }
    `;
    const query2 = {
        query: RETRIEVE_STATE2,
    }

    const response2 = await JestApiPost(JSON.stringify(query2), {
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + clientKey
        }
    });
    const parsedRes2 = JSON.parse(response2);
    expect(parsedRes2).toHaveProperty("data");
    expect(parsedRes2.data?.loginAttemptRetrieve).toBeDefined();
    expect(parsedRes2.data?.loginAttemptRetrieve).toHaveProperty("status");
    expect(parsedRes2.data?.loginAttemptRetrieve).toHaveProperty("message");
    expect(parsedRes2.data?.loginAttemptRetrieve.status).toBe("success");
}
)
// positionLabel8
// positionLabel1-receive a mutation with [state:string] for loginAttemptRetrieve, and after checking and deleting the record for that state, return operationResponse with status sucess, and if state check don't pass return status fail with the message-positionLabel2
// FE7146C8-3A1F-4E8F-8B39-C5F0071858B6