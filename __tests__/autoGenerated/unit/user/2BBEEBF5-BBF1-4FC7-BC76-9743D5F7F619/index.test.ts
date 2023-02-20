import { LoginAttemptInit } from '../../../../../src/modules/users/useCases/loginAttemptInit';


// 2BBEEBF5-BBF1-4FC7-BC76-9743D5F7F619
// positionLabel5
test.concurrent(
'use case for loginAttemptInit should return an object with {state: string, expiration: string} from the user repository',
// positionLabel6
// positionLabel7

async () => {
    const mockedUsersRepository = {
        createState: jest.fn().mockImplementationOnce(({
            state,
            expiration
        }) => {
            return {
                state,
                expiration
            }
        })
    }

    const useCase = new LoginAttemptInit(mockedUsersRepository as any);

    const result = await useCase.execute();

    expect(result).toBeDefined();
    expect(result.state).toBeDefined();
    expect(result.expiration).toBeDefined();
    expect(result.model).toBe('LoginAttemptInitResponse');
}
)
// positionLabel8
// positionLabel1-use case for loginAttemptInit should return an object with {state: string, expiration: string} from the user repository-positionLabel2
// 2BBEEBF5-BBF1-4FC7-BC76-9743D5F7F619