import { IUsersRepository } from '../../../../../src/modules/users/repositories/IUsersRepository';
import { CreateLoginRegistryUseCase } from './../../../../../src/modules/users/useCases/CreateLoginRegistry/index';


// 5F93BA61-B646-416A-A66C-5E1AE4E0FBD6
// positionLabel5
test.concurrent(
'use case for createLoginRegistry(id:string) should create and return the login registry created for that user',
// positionLabel6
// positionLabel7

async () => {
    const mockedUsersRepository = {
        createLoginRegistry: jest.fn().mockImplementation((data) => {
            return {
                id: '1',
                created_at: new Date(),
                user_id: data.userId,
            }
        }),
        createUser: jest.fn().mockImplementation((data) => {
            return {
                id: data.id,
            }
        }),
        findUserById: jest.fn().mockImplementation((data) => {
            return {
                id: data.id,
            }
        }),
        listLoginRegistries: jest.fn().mockImplementation((data) => {
            return [
                {
                    id: '1',
                    created_at: new Date(),
                    user_id: data.userId,
                },
                {
                    id: '2',
                    created_at: new Date(),
                    user_id: data.userId,
                },
                {
                    id: '3',
                    created_at: new Date(),
                    user_id: data.userId,
                },
            ]
        })
    }

    const mockedCheckAcessTokenUseCase = {
        execute: jest.fn().mockImplementation((data) => {
            return {
                id: '1',
                sub: 'myid',
            }
        })
    }

    const mockedFindUserByIdUseCase = {
        execute: jest.fn().mockImplementation((data) => {
            return {
                id: '1',
            }
        })
    }

    const mockedCreateUserUseCase = {
        execute: jest.fn().mockImplementation((data) => {
            return {
                id: '1',
            }
        })
    }



    const useCase = new CreateLoginRegistryUseCase(
        mockedUsersRepository as any,
        )
        
        
        const response = await useCase.execute({
            accessToken: 'mytoken',
            secret: 'mysecret',
            checkAccessTokenUseCase: mockedCheckAcessTokenUseCase as any,
            findUserByIdUseCase: mockedFindUserByIdUseCase as any,
            createUserUseCase: mockedCreateUserUseCase as any,
    })


    expect(response).toHaveProperty('id')
    expect(response.id).toBe('1')
    expect(response).toHaveProperty('created_at')
    expect(response).toHaveProperty('user_id')
    expect(response.user_id).toBe('myid')
}
)
// positionLabel8
// positionLabel1-use case for createLoginRegistry(id:string) should create and return the login registry created for that user-positionLabel2
// 5F93BA61-B646-416A-A66C-5E1AE4E0FBD6