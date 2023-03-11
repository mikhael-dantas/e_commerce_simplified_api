import { ListLoginRegistriesUseCase } from './../../../../../src/modules/users/useCases/ListLoginRegistries/index';


// DBB7A44E-FD86-4C58-895E-1828AB6CB0AA
// positionLabel5
test.concurrent(
'use case for listLoginRegistries(take:number=2,skip:number=0) should return an array of login registries of default size 2, being of size of at least 1 for new user. ',
// positionLabel6
// positionLabel7

async () => {
    const mockedLoginRegistries = [
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
            user_id: 'user_id1',
        },
    ]

    const mockedUsersRepo = {
        listLoginRegistries: jest.fn((data) => {
            const correctLogins = mockedLoginRegistries.filter((login) => login.user_id === data.user_id)
            return Promise.resolve(correctLogins.slice(data.skip, data.skip + data.take))
        })
    }

    const useCase = new ListLoginRegistriesUseCase(
        mockedUsersRepo as any,
    )

    const loginRegistries = await useCase.execute({
        user_id: 'user_id1',
    })

    expect(loginRegistries).toBeDefined()
    expect(loginRegistries.length >= 1).toBeTruthy()
    expect(loginRegistries.length <= 2).toBeTruthy()
}
)
// positionLabel8
// positionLabel1-use case for listLoginRegistries(take:number=2,skip:number=0) should return an array of login registries of default size 2, being of size of at least 1 for new user. -positionLabel2
// DBB7A44E-FD86-4C58-895E-1828AB6CB0AA