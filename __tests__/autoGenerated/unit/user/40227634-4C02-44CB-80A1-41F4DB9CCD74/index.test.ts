import { CheckAccessTokenUseCase } from './../../../../../src/modules/users/useCases/CheckAccessToken/index';


// 40227634-4C02-44CB-80A1-41F4DB9CCD74

import { sign } from "jsonwebtoken"

// positionLabel5
test.concurrent(
'use case for checkAccessToken should check if the token is valid and return the decoded token if it is',
// positionLabel6
// positionLabel7

async () => {
    const useCase = new CheckAccessTokenUseCase()

    const payload = {
        sub: 'myid',
        name: 'fake',
        email: 'fake@fake.com',
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
    })

    expect(response).toHaveProperty('sub')
    expect(response.sub).toBe(payload.sub)
}
)
// positionLabel8
// positionLabel1-use case for checkAccessToken should check if the token is valid and return the decoded token if it is-positionLabel2
// 40227634-4C02-44CB-80A1-41F4DB9CCD74