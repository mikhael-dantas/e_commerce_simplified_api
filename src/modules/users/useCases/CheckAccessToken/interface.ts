export interface ICheckAccessTokenUseCase {
    execute({
        token,
        secret,
    }:{
        token: string,
        secret: string
    }): Promise<object>
}
