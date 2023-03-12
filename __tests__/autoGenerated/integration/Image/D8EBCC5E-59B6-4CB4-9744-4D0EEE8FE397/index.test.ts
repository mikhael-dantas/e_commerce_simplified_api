

// D8EBCC5E-59B6-4CB4-9744-4D0EEE8FE397

import { sign } from "jsonwebtoken"
import { JestApiPost } from "../../../../../jestTestsUtils"

// positionLabel5
test.concurrent(
`receive a mutation for createImage receiving user identification and the name:String,  description,  tags      Json array,  image_url    String. and returns the created image data of that user that don't failed the authorization.`,
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
            }
        }
    `

    const testAccessToken = sign({
        sub: 'user_id',
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

    const response = await JestApiPost(query, undefined, variables)
    const parsedResponse = JSON.parse(response)

    expect(parsedResponse).toHaveProperty('data')
    expect(parsedResponse.data).toHaveProperty('createImage')
    expect(parsedResponse.data.createImage).toHaveProperty('__typename')
    expect(parsedResponse.data.createImage.__typename).toBe('Image')
    expect(parsedResponse.data.createImage).toHaveProperty('id')
    expect(parsedResponse.data.createImage).toHaveProperty('name')
    expect(parsedResponse.data.createImage).toHaveProperty('description')
    expect(parsedResponse.data.createImage).toHaveProperty('tags')
    expect(parsedResponse.data.createImage).toHaveProperty('image_url')
    expect(parsedResponse.data.createImage).toHaveProperty('user_id')
    expect(parsedResponse.data.createImage).toHaveProperty('created_at')
}
)
// positionLabel8
// positionLabel1-receive a mutation for createImage receiving user identification and the name:String,  description,  tags      Json array,  image_url    String. and returns the created image data of that user that don't failed the authorization.-positionLabel2
// D8EBCC5E-59B6-4CB4-9744-4D0EEE8FE397