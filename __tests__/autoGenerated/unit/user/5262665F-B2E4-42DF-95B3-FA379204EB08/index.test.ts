import { CreateUserUseCase } from './../../../../../src/modules/users/useCases/CreateUser/index';


// 5262665F-B2E4-42DF-95B3-FA379204EB08
// positionLabel5
test.concurrent(
'use case for createUser(id: string)  should return the created user data, after creating it in the database',
// positionLabel6
// positionLabel7

async () => {
    const mockedUsersRepository: any = {
        createUser: jest.fn().mockImplementation((data) => {
            return {
                id: data.id,
            }
        })
    }

    const useCase = new CreateUserUseCase(
        mockedUsersRepository,
    )

    const response = await useCase.execute({
        id: 'myid',
    })

    expect(response).toHaveProperty('id')
    expect(response.id).toBe('myid')
}
)
// positionLabel8
// positionLabel1-use case for createUser(id: string)  should return the created user data, after creating it in the database-positionLabel2
// 5262665F-B2E4-42DF-95B3-FA379204EB08