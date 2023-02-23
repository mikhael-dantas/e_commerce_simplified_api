import { RetrieveStateUseCase } from './../../../../../src/modules/users/useCases/RetrieveState/index';


// C3275DD7-5AF7-4393-B82A-036A9BAFD9D0
// positionLabel5
test.concurrent(
'use case for retrieveState should return operationResponse with sucess status and string message, or fail status with message if retrieve fails',
// positionLabel6
// positionLabel7

async () => {
    const mockedRepo = {
        retrieveState: jest.fn().mockImplementation((value) => {
            if (value === 'test') {
                return 'test'
            }
            return null
        })
    }

    const useCase = new RetrieveStateUseCase(mockedRepo as any)

    const operationResponse = await useCase.execute('test')

    expect(operationResponse).toHaveProperty('status')
    expect(operationResponse).toHaveProperty('message')
    expect(operationResponse.status).toBe('success')
    expect(operationResponse.message).toBe('test')

    const operationResponse2 = await useCase.execute('test2')

    expect(operationResponse2).toHaveProperty('status')
    expect(operationResponse2).toHaveProperty('message')
    expect(operationResponse2.status).toBe('fail')
    expect(operationResponse2.message).toBeDefined()
}
)
// positionLabel8
// positionLabel1-use case for retrieveState should return operationResponse with sucess status and string message, or fail status with message if retrieve fails-positionLabel2
// C3275DD7-5AF7-4393-B82A-036A9BAFD9D0