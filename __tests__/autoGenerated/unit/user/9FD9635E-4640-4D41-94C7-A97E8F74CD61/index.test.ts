import { UsersRepository } from './../../../../../src/modules/users/repositories/UsersRepository';


// 9FD9635E-4640-4D41-94C7-A97E8F74CD61
// positionLabel5
test.concurrent(
'repository for user.createState should return an object with {state: string, expiration: string} after creating the record in redis',
// positionLabel6
// positionLabel7

async () => {
    const state = 'state'
    const expiration = '1'

    const mockedRedisClient = {
        set: jest.fn().mockImplementation((key, value, expirationToken, expiration) => {
            expect(key).toBe(state)
            expect(value).toBe(expiration)
            return Promise.resolve('OK')
        })
    }


    const respository = new UsersRepository(mockedRedisClient as any)


    const res = await respository.createState({state, expiration})

    expect(res).toBeDefined()
    expect(res).toHaveProperty('state')
    expect(res).toHaveProperty('expiration')
    expect(res.state).toBe(state)
    expect(res.expiration).toBe(expiration)
}
)
// positionLabel8
// positionLabel1-repository for user.createState should return an object with {state: string, expiration: string} after creating the record in redis-positionLabel2
// 9FD9635E-4640-4D41-94C7-A97E8F74CD61