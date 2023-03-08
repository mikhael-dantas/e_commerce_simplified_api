import { CheckClientKeyUseCase } from './../../../../../src/shared/authCheck/client/CheckClientKey';


// 40D95936-D2BA-4431-A460-557308B10174
// positionLabel5
test.concurrent(
`use case for checkClientKey should return an object with a boolean indicating passed or don't, and if don't, return a value with an object for unauthorizedClient.`,
// positionLabel6
// positionLabel7

() => {
    const clientKey = process.env.CLIENT_KEY
    if (!clientKey) { throw new Error('No client key found in env') }

    const useCase = new CheckClientKeyUseCase()

    const result = useCase.execute({clientKey: "clientKey"})

    expect(result).toBeDefined()
    expect((result as any).model).toBe('unauthorizedClient')
    expect(result).toHaveProperty('message')

    const result2 = useCase.execute({clientKey: clientKey})

    expect(result2).toBeDefined()
    expect(result2).toHaveProperty('authorized')
    expect((result2 as any).authorized).toBe(true)
}
)
// positionLabel8
// positionLabel1-use case for checkClientKey should return an object with a boolean indicating passed or don't, and if don't, return a value with an object for unauthorizedClient.-positionLabel2
// 40D95936-D2BA-4431-A460-557308B10174