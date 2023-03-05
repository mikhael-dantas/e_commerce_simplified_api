import { UsersResolver } from './../../../../../src/modules/users/resolvers';

// 862B90D4-63D3-4DAC-9630-4F6A323D15D7
// positionLabel5
test.concurrent(
'resolver for query loginAttempt passing clientKey in header authorization bearer, should call Client authorization use case and then return a object with {state:string, expiration: string} property from the operation usecase after executing it',
// positionLabel6
// positionLabel7


async () => {
    const clientKey = process.env.CLIENT_KEY
    if (!clientKey) { throw new Error('No client key found in env') }

    const mockedLoginAttemptInitUseCase = {
        execute: jest.fn().mockReturnValue({
            model: 'state',
            state: 'string',
            expiration: 'string'
        })
    }

    const resolver = new UsersResolver({loginAttemptInitUseCase: mockedLoginAttemptInitUseCase as any})

    const result = await resolver.loginAttemptInit(
        {req: {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + clientKey
            }
        }},
    )

    expect(result).toBeDefined()
    expect(result.model).toBe('state')
    expect(result).toHaveProperty('state')
    expect(result).toHaveProperty('expiration')

// this code fail was put in here because this test name was eddited
;expect(true).toBe(false);}
)
// positionLabel8
// positionLabel1-resolver for query loginAttempt passing clientKey in header authorization bearer, should call Client authorization use case and then return a object with {state:string, expiration: string} property from the operation usecase after executing it-positionLabel2
// 862B90D4-63D3-4DAC-9630-4F6A323D15D7