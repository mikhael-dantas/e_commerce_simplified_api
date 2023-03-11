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

    const image = await repo.create({
        name: 'name',
        description: 'description',
        tags: ['tag1', 'tag2'],
        image_url: 'image_url',
        user_id: 'user_id',
    })

    expect(image).toBeDefined()
    expect(image).toHaveProperty('name')
    expect(image).toHaveProperty('description')
    expect(image).toHaveProperty('tags')
    expect(image).toHaveProperty('image_url')
    expect(image).toHaveProperty('user_id')
    expect(image).toHaveProperty('id')
    expect(image).toHaveProperty('created_at')
}
)
// positionLabel8
// positionLabel1-repo for Image.create receiving all image needed data should return the created image-positionLabel2
// 30EA1E64-CEF3-4A72-94C2-6D90ACED2723