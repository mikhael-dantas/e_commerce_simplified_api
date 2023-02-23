

// BEDDCC87-07B3-4E39-ABBB-1F83ABE4FE96

import { CreateMockContext } from "../../../../../jestTestsUtils"
import { UsersRepository } from "../../../../../src/modules/users/repositories/UsersRepository"

// positionLabel5
test.concurrent(
'repo for user.createLoginRegistry(id:string) should create the login registry for that id and return the data inserted ',
// positionLabel6
// positionLabel7

async () => {
    const mockedPrismaClient = CreateMockContext().prisma

    mockedPrismaClient.loginRegistry.create.mockImplementation((data): any => {
        return Promise.resolve({
            id: '1',
            user_id: data.data.user_id,
            created_at: new Date(),
        })
    })

    const usersRepo = new UsersRepository(undefined as any, mockedPrismaClient)

    const loginRegistry = await usersRepo.createLoginRegistry({
        userId: 'user_id1',
    })

    expect(loginRegistry).toBeDefined()
    expect(loginRegistry.id).toBe('1')
    expect(loginRegistry.user_id).toBe('user_id1')
    expect(loginRegistry.created_at).toBeDefined()
}
)
// positionLabel8
// positionLabel1-repo for user.createLoginRegistry(id:string) should create the login registry for that id and return the data inserted -positionLabel2
// BEDDCC87-07B3-4E39-ABBB-1F83ABE4FE96