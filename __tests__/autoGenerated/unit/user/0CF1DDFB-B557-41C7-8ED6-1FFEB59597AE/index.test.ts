import { UsersResolver } from './../../../../../src/modules/users/resolvers/index';


// 0CF1DDFB-B557-41C7-8ED6-1FFEB59597AE
// positionLabel5
test.concurrent(
'resolver mutation for loginRegistration(accessToken: string) should check if the token is valid, then if user exists, and if don\'t, create a user in the database with that sub id, then store the login registry, then returns a register of the last 2 logins from the user',
// positionLabel6
// positionLabel7

async () => {
    const mockedCreateRegistryUseCase = {
        execute: jest.fn().mockImplementation((data) => {
            return {
                id: '1',
                created_at: new Date(),
                user_id: "user_id1",
            }
        })
    }

    const resolver = new UsersResolver({
        CreateLoginRegistryUseCase: mockedCreateRegistryUseCase as any,
    })

    const loginRegistry = await resolver.loginRegistration( 'mytoken' )

    expect(loginRegistry).toBeDefined()
    expect(loginRegistry.id).toBe('1')
    expect(loginRegistry.user_id).toBe('user_id1')
    expect(loginRegistry.created_at).toBeDefined()
}
)
// positionLabel8
// positionLabel1-resolver mutation for loginRegistration(accessToken: string) should check if the token is valid, then if user exists, and if don't, create a user in the database with that sub id, then store the login registry, then returns a register of the last 2 logins from the user-positionLabel2
// 0CF1DDFB-B557-41C7-8ED6-1FFEB59597AE