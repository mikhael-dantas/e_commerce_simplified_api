import { UsersRepository } from './../../../../../src/modules/users/repositories/UsersRepository';


// 7D2F392B-7E2B-454A-894D-427012459D4F

import { CreateMockContext } from "../../../../../jestTestsUtils"

// positionLabel5
test.concurrent(
'repo for user.listLoginRegistries(take:number=2,skip:number=0) should return an array of login registries of default size 2',
// positionLabel6
// positionLabel7

async () => {
    const mockedPrisma = CreateMockContext().prisma

    const arrayOfLoginRegistries = [
        {
            id: '1',
            model: 'loginRegistry',
            created_at: new Date(),
            user_id: 'user_id1',
        },
        {
            id: '2',
            model: 'loginRegistry',
            created_at: new Date(),
            user_id: 'user_id2',
        },
        {
            id: '3',
            model: 'loginRegistry',
            created_at: new Date(),
            user_id: 'user_id1',
        },
        {
            id: '4',
            model: 'loginRegistry',
            created_at: new Date(),
            user_id: 'user_id2',
        },
    ]


    mockedPrisma.loginRegistry.findMany.mockImplementation((data: any): any => {
        const correctLogins = arrayOfLoginRegistries.filter((login) => login.user_id === data.where.user_id)
        return Promise.resolve(correctLogins.slice(data.skip, data.skip + data.take))
    })

    const usersRepo = new UsersRepository(undefined as any, mockedPrisma)

    const loginRegistries = await usersRepo.listLoginRegistries({
        userId: 'user_id1',
        take: 2,
        skip: 0,
    })

    expect(loginRegistries).toBeDefined()
    expect(loginRegistries.length >= 1).toBeTruthy()
    expect(loginRegistries.length <= 2).toBeTruthy()
}
)
// positionLabel8
// positionLabel1-repo for user.listLoginRegistries(take:number=2,skip:number=0) should return an array of login registries of default size 2-positionLabel2
// 7D2F392B-7E2B-454A-894D-427012459D4F