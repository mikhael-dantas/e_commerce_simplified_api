
export interface IUsersRepository {
    createState({
        expiration
    }:{
        expiration: string
    }): Promise<{ state: string; expiration: string }>
}
