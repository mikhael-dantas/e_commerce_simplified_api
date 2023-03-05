import { UsersResolver } from './../../../../../src/modules/users/resolvers/index';

// 0CF1DDFB-B557-41C7-8ED6-1FFEB59597AE
// positionLabel5
test.concurrent(
`resolver mutation for loginRegistration after authorizing client key and the access token and storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don't, create a user in the database with that id, then store the login registry, then returns a register of the login registry`,
// positionLabel6
// positionLabel7



async () => {
    const clientKey = process.env.CLIENT_KEY
    if (!clientKey) { throw new Error('No client key found in env') }


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
        createLoginRegistryUseCase: mockedCreateRegistryUseCase as any,
    })

    const loginRegistry = await resolver.loginRegistration({
        req: {
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + clientKey
            }
        }
    }, 'mytoken' )

    expect(loginRegistry).toBeDefined()
    expect(loginRegistry.id).toBe('1')
    expect(loginRegistry.user_id).toBe('user_id1')
    expect(loginRegistry.created_at).toBeDefined()


}
)
// positionLabel8
// positionLabel1-resolver mutation for loginRegistration after authorizing client key and the access token and storing a login record in the database for the given user (that uses "sub" token payload as ID for the user table), recording the date of the login, but before it, check if user exists and if don't, create a user in the database with that id, then store the login registry, then returns a register of the login registry-positionLabel2
// 0CF1DDFB-B557-41C7-8ED6-1FFEB59597AE