

// FD3EFEF4-1FA9-446E-A21A-A2A6292AED8B

import { CreateMockContext } from "../../../../../jestTestsUtils"
import { UsersRepository } from "../../../../../src/modules/users/repositories/UsersRepository"

// positionLabel5
test.concurrent(
'user repo for createUser(id: string)  should return the created user data, after creating it in the database',
// positionLabel6
// positionLabel7

async () => {
    const mockedPrismaClient = CreateMockContext().prisma

    mockedPrismaClient.user.create.mockImplementation((data): any => {
        return Promise.resolve({
            id: data.data.id,
        })
    })

    const usersRepo = new UsersRepository(undefined as any, mockedPrismaClient as any)

    const user = await usersRepo.createUser({
        id: 'user_id1',
    })

    expect(user).toBeDefined()
    expect(user.id).toBe('user_id1')
}
)
// positionLabel8
// positionLabel1-user repo for createUser(id: string)  should return the created user data, after creating it in the database-positionLabel2
// FD3EFEF4-1FA9-446E-A21A-A2A6292AED8B