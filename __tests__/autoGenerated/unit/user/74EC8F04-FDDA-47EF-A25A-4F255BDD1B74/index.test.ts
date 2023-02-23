import { UsersRepository } from './../../../../../src/modules/users/repositories/UsersRepository';


// 74EC8F04-FDDA-47EF-A25A-4F255BDD1B74
// positionLabel5
test.concurrent(
'respository for users.retrieveState should return null if retrieve fails or the retrieved state after deleting it if exists',
// positionLabel6
// positionLabel7

async () => {
    const mockedRedisClient = {
        getdel: jest.fn().mockImplementation((value) => {
            if (value === 'test') {
                return 'test'
            }
            return null
        })
    }
    const repo = new UsersRepository(mockedRedisClient as any)

    const retrievedState = await repo.retrieveState('test')

    expect(retrievedState).toBe('test')
    expect(mockedRedisClient.getdel).toBeCalledTimes(1)
    expect(mockedRedisClient.getdel).toBeCalledWith('test')

}
)
// positionLabel8
// positionLabel1-respository for users.retrieveState should return null if retrieve fails or the retrieved state after deleting it if exists-positionLabel2
// 74EC8F04-FDDA-47EF-A25A-4F255BDD1B74