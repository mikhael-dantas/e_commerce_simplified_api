

// 8EB6E5C4-35E9-43FF-AFEA-99D167119456

import { CreateMockContext } from "../../../../../jestTestsUtils"
import { UsersRepository } from "../../../../../src/modules/users/repositories/UsersRepository"

// positionLabel5
test.concurrent(
'repo for user.findUserById should return the user with that Id or null if not found',
// positionLabel6
// positionLabel7

async () => {
    const mockedPrismaClient = CreateMockContext().prisma

    mockedPrismaClient.user.findUnique.mockImplementation((data): any => {
        return Promise.resolve({
            id: data.where.id,
        })
    })

    const usersRepo = new UsersRepository(undefined as any, mockedPrismaClient)

    const user = await usersRepo.findUserById({
        id: 'user_id1',
    })

    expect(user).toBeDefined()
    expect(user?.id).toBe('user_id1')
}
)
// positionLabel8
// positionLabel1-repo for user.findUserById should return the user with that Id or null if not found-positionLabel2
// 8EB6E5C4-35E9-43FF-AFEA-99D167119456