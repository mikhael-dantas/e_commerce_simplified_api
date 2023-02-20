import { UsersResolver } from './../../../../../src/modules/users/resolvers';


// 862B90D4-63D3-4DAC-9630-4F6A323D15D7
// positionLabel5
test.concurrent(
'resolver for query loginAttempt should return a object with {state:string, expiration: string} property from the usecase',
// positionLabel6
// positionLabel7

async () => {
    const mockedLoginAttemptInitUseCase = {
        execute: jest.fn().mockReturnValue({
            model: 'state',
            state: 'string',
            expiration: 'string'
        })
    }

    const resolver = new UsersResolver({loginAttemptInitUseCase: mockedLoginAttemptInitUseCase as any})

    const result = await resolver.loginAttemptInit()

    expect(result).toBeDefined()
    expect(result.model).toBe('state')
    expect(result).toHaveProperty('state')
    expect(result).toHaveProperty('expiration')
}
)
// positionLabel8
// positionLabel1-resolver for query loginAttempt should return a object with {state:string, expiration: string} property from the usecase-positionLabel2
// 862B90D4-63D3-4DAC-9630-4F6A323D15D7