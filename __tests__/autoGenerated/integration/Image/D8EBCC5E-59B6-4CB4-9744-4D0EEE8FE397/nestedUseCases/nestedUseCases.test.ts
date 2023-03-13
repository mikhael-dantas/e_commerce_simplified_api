import { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken"
import { JestApiPost } from "../../../../../../jestTestsUtils"
import { randomUUID } from "crypto"

// BC23B337-B61E-46F4-A689-96BF6A8580A8
// positionLabel5
test.concurrent(
`received mutation for createImage should return unauthorizedError if the user acesstoken don't have manager permission`,
// positionLabel6
// positionLabel7

async () => {
    const query = `
        mutation createImage($accessToken: String!, $name: String!, $description: String!, $tags: [String!]!, $image_url: String!) {
            createImage(accessToken: $accessToken, name: $name, description: $description, tags: $tags, image_url: $image_url) {
                __typename
                ... on Image {
                    id
                    name
                    description
                    tags
                    image_url
                    user_id
                    created_at
                }
                ... on UnauthorizedError {
                    message
                }
            }
        }
    `

    const user = {
        sub: randomUUID()
    }

    const testAccessToken = sign({
        sub: user.sub,
    }, process.env.AUTH0_PUBLIC_KEY!, {
        algorithm: 'HS256',
    })

    const variables = {
        accessToken: testAccessToken,
        name: 'name',
        description: 'description',
        tags: ['tag1', 'tag2'],
        image_url: 'image_url',
    }


    const prismaClient = new PrismaClient()
    await prismaClient.user.create({
        data: {
            id: user.sub,
        }
    })
    await prismaClient.$disconnect()


    const response = await JestApiPost(query, undefined, variables)
    const parsedResponse = JSON.parse(response)

    expect(parsedResponse.data).toBeDefined()
    expect(parsedResponse.data.createImage).toBeDefined()
    expect(parsedResponse.data.createImage.__typename).toBe('UnauthorizedError')
    expect(parsedResponse.data.createImage.message).toBeDefined()
}
)
// positionLabel8
// positionLabel1-received mutation for createImage should return unauthorizedError if the user acesstoken don't have manager permission-positionLabel2
// BC23B337-B61E-46F4-A689-96BF6A8580A8