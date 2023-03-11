import { ImagesRepository } from './../../../../../src/modules/images/repositories/index';
import { CreateMockContext } from './../../../../../jestTestsUtils';


// 30EA1E64-CEF3-4A72-94C2-6D90ACED2723
// positionLabel5
test.concurrent(
'repo for Image.create receiving all image needed data should return the created image',
// positionLabel6
// positionLabel7

async () => {

    const mockedPrisma = CreateMockContext().prisma

    const repo = new ImagesRepository(mockedPrisma)

    const mockedImplementation = async (data: any) => {
        return {
            id: data.data.id,
            name: data.data.name,
            description: data.data.description,
            tags: data.data.tags,
            image_url: data.data.image_url,
            user_id: data.data.user_id,
            created_at: new Date(),
        }
    }
    mockedPrisma.image.create.mockImplementationOnce(mockedImplementation as any)


    const image = await repo.create({
        name: 'name',
        description: 'description',
        tags: ['tag1', 'tag2'],
        image_url: 'image_url',
        user_id: 'user_id',
    })

    expect(image).toBeDefined()
    expect(image).toHaveProperty('id')
    expect(image).toHaveProperty('created_at')
    expect(image).toHaveProperty('name')
    expect(image.name).toBe('name')
    expect(image).toHaveProperty('description')
    expect(image.description).toBe('description')
    expect(image).toHaveProperty('tags')
    expect(image.tags).toEqual(['tag1', 'tag2'])
    expect(image).toHaveProperty('image_url')
    expect(image.image_url).toBe('image_url')
    expect(image).toHaveProperty('user_id')
    expect(image.user_id).toBe('user_id')
}
)
// positionLabel8
// positionLabel1-repo for Image.create receiving all image needed data should return the created image-positionLabel2
// 30EA1E64-CEF3-4A72-94C2-6D90ACED2723