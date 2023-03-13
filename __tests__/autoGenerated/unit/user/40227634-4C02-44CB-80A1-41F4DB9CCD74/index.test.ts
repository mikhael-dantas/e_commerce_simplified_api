import { CheckAccessTokenUseCase } from './../../../../../src/modules/users/useCases/CheckAccessToken/index';
import { sign } from "jsonwebtoken"

// 40227634-4C02-44CB-80A1-41F4DB9CCD74
// positionLabel5
test.concurrent(
`use case for checkAccessToken should check if the token is valid and return the decoded token if it is, and also check the given permissions in the token permissions key.`,
// positionLabel6
// positionLabel7


async () => {
    const useCase = new CheckAccessTokenUseCase()

    const payload = {
        sub: 'myid',
        name: 'fake',
        email: 'fake@fake.com',
        permissions: ['manager']
    }

    const secret = 'secret'

    const jwtToken = sign(
        payload,
        secret,
        {
            algorithm: 'HS256',
        }
    )


    const response = await useCase.execute({
        token: jwtToken,
        secret,
        algorithm: 'HS256',
        permissions: ["manager"]
    })

    expect(response).toHaveProperty('sub')
    expect(response.sub).toBe(payload.sub)
    expect(response).toHaveProperty('permissions')

}
)
// positionLabel8
// positionLabel1-use case for checkAccessToken should check if the token is valid and return the decoded token if it is, and also check the given permissions in the token permissions key.-positionLabel2
// 40227634-4C02-44CB-80A1-41F4DB9CCD74