import { UsersResolver } from './../../../../../src/modules/users/resolvers/index';

// DCF06390-5DD8-4A8B-B452-B54BB2527D10
// positionLabel5
test.concurrent(
'resolver for mutation loginAttemptRetrieve receiving the state and the client id, should call authorization fot he clientid, and then return operationResponse from the operation usecase with status string success if state exist, fail if dont, and the message',
// positionLabel6
// positionLabel7



async () => {
    const mockedUseCase = {
        execute: jest.fn().mockImplementation((value) => {
            if (value === 'test') {
                return {
                    model: 'operationResponse',
                    status: 'success',
                    message: 'test'
                }
            }
            return {
                model: 'operationResponse',
                status: 'fail',
                message: 'test'
            }
        })
    }

    const mockedCheckClientKey = {
        execute: jest.fn().mockReturnValue({
            authorized: true,
        })
    }

    const resolver = new UsersResolver({
        loginAttemptRetrieveUseCase: mockedUseCase as any,
        checkClientKey: mockedCheckClientKey as any,
    })

    const clientKey = process.env.CLIENT_KEY
    if (!clientKey) { throw new Error('No client key found in env') }

    const operationResponse = await resolver.loginAttemptRetrieve({
        req: {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + clientKey
            }
        }
    },'test')

    expect(operationResponse).toHaveProperty('status')
    expect(operationResponse).toHaveProperty('message')
    expect(operationResponse.status).toBe('success')
    expect(operationResponse.message).toBe('test')

    const operationResponse2 = await resolver.loginAttemptRetrieve({
        req: {
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + clientKey
            }
        }
    },'test2')

    expect(operationResponse2).toHaveProperty('status')
    expect(operationResponse2).toHaveProperty('message')
    expect(operationResponse2.status).toBe('fail')
    expect(operationResponse2.message).toBeDefined()

}
)
// positionLabel8
// positionLabel1-resolver for mutation loginAttemptRetrieve receiving the state and the client id, should call authorization fot he clientid, and then return operationResponse from the operation usecase with status string success if state exist, fail if dont, and the message-positionLabel2
// DCF06390-5DD8-4A8B-B452-B54BB2527D10