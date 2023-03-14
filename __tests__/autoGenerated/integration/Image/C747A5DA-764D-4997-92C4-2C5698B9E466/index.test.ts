import { PrismaClient } from '@prisma/client';
import { randomUUID } from "crypto";
import { JestApiPost } from '../../../../../jestTestsUtils';



// C747A5DA-764D-4997-92C4-2C5698B9E466
// positionLabel5
test.concurrent(
`receive query for getImages, retrieving a list of images and filter results based on args: skip (optional, default: 0) - The number of records to skip before starting to return results. take (optional, default: 10) - The maximum number of records to return. orderBy (optional, default: "created_at") - The field to sort the results by. Valid values are "id", "created_at", "name", and "user_id". orderDirection (optional, default: "desc") - The direction to sort the results in. Valid values are "asc" (ascending) and "desc" (descending). name (optional) - Filter the results by image name. description (optional) - Filter the results by image description. tags (optional) - Filter the results by image tags. Multiple values can be specified by repeating the tags parameter. userId (optional) - Filter the results by the user ID of the image owner. image_url (optional) - Filter the results by the image url of the image. And returns an object containing pagination info and the data array`,
// positionLabel6
// positionLabel7

async () => {
    const query = `
        query QUERYIMAGES($skip: Int, $take: Int, $orderBy: String, $orderDirection: String, $name: String, $description: String, $tags: [String!], $user_id: String, $image_url: String) {
            getImages(skip: $skip, take: $take, orderBy: $orderBy, orderDirection: $orderDirection, name: $name, description: $description, tags: $tags, user_id: $user_id, image_url: $image_url) {
                __typename
                ... on ImagesPagination {
                    data {
                        id,
                        name,
                        description,
                        tags,
                        image_url,
                        user_id,
                        created_at,
                    }
                    count,
                    cursor,
                }
            }
        }
    `;

    const user = {
        id: randomUUID(),
    }

    const image = {
        id: randomUUID(),
        name: randomUUID(),
        description: randomUUID(),
        tags: [randomUUID(), randomUUID()],
        image_url: randomUUID(),
        user_id: user.id,
    }

    const prismaClient = new PrismaClient();

    await prismaClient.user.create({
        data: user,
    });

    await prismaClient.image.create({
        data: image,
    });

    await prismaClient.$disconnect();


    const variables = {
        skip: 0,
        take: 10,
        orderBy: "created_at",
        orderDirection: "desc",
        name: image.name,
        description: image.description,
        tags: image.tags,
        user_id: image.user_id,
        image_url: image.image_url,
    };

    const response = await JestApiPost(query, undefined, variables);

    const parsedRes = JSON.parse(response);

    expect(parsedRes.errors).toBeUndefined();
    expect(parsedRes.data).toBeDefined();
    expect(parsedRes.data.getImages).toBeDefined();
    expect(parsedRes.data.getImages.__typename).toBe('ImagesPagination');
    expect(parsedRes.data.getImages.data).toBeDefined();
    expect(parsedRes.data.getImages.data).toHaveLength(1);
    expect(parsedRes.data.getImages.data[0].name).toBe(image.name);
    expect(parsedRes.data.getImages.count).toBe(1);
    expect(parsedRes.data.getImages.cursor).toBe(0);


    const queryWithoutSomeArgs = `
        query getImages($tags: [String!]) {
            getImages(tags: $tags) {
                __typename
                ... on ImagesPagination {
                    data {
                        id,
                        name,
                        description,
                        tags,
                        image_url,
                        user_id,
                        created_at,
                    }
                    count,
                    cursor,
                }
            }
        }
    `
    const responseWithoutSomeArgs = await JestApiPost(queryWithoutSomeArgs, undefined, { tags: [image.tags[1]] });

    const parsedResWithoutSomeArgs = JSON.parse(responseWithoutSomeArgs);

    expect(parsedResWithoutSomeArgs.data).toBeDefined();
    expect(parsedResWithoutSomeArgs.data.getImages).toBeDefined();
    expect(parsedResWithoutSomeArgs.data.getImages.__typename).toBe('ImagesPagination');
    expect(parsedResWithoutSomeArgs.data.getImages.data).toBeDefined();
    expect(parsedResWithoutSomeArgs.data.getImages.data).toHaveLength(1);
    expect(parsedResWithoutSomeArgs.data.getImages.data[0].name).toBe(image.name);
    expect(parsedResWithoutSomeArgs.data.getImages.count).toBe(1);
    expect(parsedResWithoutSomeArgs.data.getImages.cursor).toBe(0);


    const queryWithNoMatchingArgs = `
    query QUERYIMAGES($tags: [String!]) {
        getImages(tags: $tags) {
            __typename
            ... on ImagesPagination {
                data {
                    id,
                    name,
                    description,
                    tags,
                    image_url,
                    user_id,
                    created_at,
                }
                count,
                cursor,
            }
        }
    }
    `

    const responseWithNoMatchingArgs = await JestApiPost(queryWithNoMatchingArgs, undefined, {tags: [randomUUID()]});

    const parsedResWithNoMatchingArgs = JSON.parse(responseWithNoMatchingArgs);

    expect(parsedResWithNoMatchingArgs.errors).toBeUndefined();
    expect(parsedResWithNoMatchingArgs.data).toBeDefined();
    expect(parsedResWithNoMatchingArgs.data.getImages).toBeDefined();
    expect(parsedResWithNoMatchingArgs.data.getImages.__typename).toBe('ImagesPagination');
    expect(parsedResWithNoMatchingArgs.data.getImages.data).toBeDefined();
    expect(parsedResWithNoMatchingArgs.data.getImages.data).toHaveLength(0);
    expect(parsedResWithNoMatchingArgs.data.getImages.count).toBe(0);
    expect(parsedResWithNoMatchingArgs.data.getImages.cursor).toBe(0);


    const queryWithNothing = `
        query {
            getImages {
                __typename
                ... on ImagesPagination {
                    data {
                        id,
                        name,
                        description,
                        tags,
                        image_url,
                        user_id,
                        created_at,
                    }
                    count,
                    cursor,
                }
            }
        }
    `

    const responseWithCleanQuery = await JestApiPost(JSON.stringify({query: queryWithNothing}))

    const parsedResponseWithCleanQuery = JSON.parse(responseWithCleanQuery)

    expect(parsedResponseWithCleanQuery.errors).toBeUndefined();
    expect(parsedResponseWithCleanQuery.data).toBeDefined();
    expect(parsedResponseWithCleanQuery.data.getImages).toBeDefined();
    expect(parsedResponseWithCleanQuery.data.getImages.__typename).toBe('ImagesPagination');
    expect(parsedResponseWithCleanQuery.data.getImages.data).toBeDefined();
    expect(parsedResponseWithCleanQuery.data.getImages.data).toHaveLength(1);
    expect(parsedResponseWithCleanQuery.data.getImages.count).toBe(1);
    expect(parsedResponseWithCleanQuery.data.getImages.cursor).toBe(0);


}
)
// positionLabel8
// positionLabel1-receive query for getImages, retrieving a list of images and filter results based on args: skip (optional, default: 0) - The number of records to skip before starting to return results. take (optional, default: 10) - The maximum number of records to return. orderBy (optional, default: "created_at") - The field to sort the results by. Valid values are "id", "created_at", "name", and "user_id". orderDirection (optional, default: "desc") - The direction to sort the results in. Valid values are "asc" (ascending) and "desc" (descending). name (optional) - Filter the results by image name. description (optional) - Filter the results by image description. tags (optional) - Filter the results by image tags. Multiple values can be specified by repeating the tags parameter. userId (optional) - Filter the results by the user ID of the image owner. image_url (optional) - Filter the results by the image url of the image. And returns an object containing pagination info and the data array-positionLabel2
// C747A5DA-764D-4997-92C4-2C5698B9E466