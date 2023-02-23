import { FindUserByIdUseCase } from './../../../../../src/modules/users/useCases/FindUserById/index';


// C1CA3845-BEB6-4B56-9419-C857ED610847
// positionLabel5
test.concurrent(
'use case for findUserById(id: string) should return the user with that Id',
// positionLabel6
// positionLabel7

async () => {
    const mockedUsersRepo: any = {
        findUserById: jest.fn((data) => {
            return Promise.resolve({
                id: data.id,
            })
        })
    }

    const useCase = new FindUserByIdUseCase(
        mockedUsersRepo,
    )

    const user = await useCase.execute({
        id: 'user_id1',
    })

    expect(user).toBeDefined()
    expect(user.id).toBe('user_id1')
}
)
// positionLabel8
// positionLabel1-use case for findUserById(id: string) should return the user with that Id-positionLabel2
// C1CA3845-BEB6-4B56-9419-C857ED610847