
export interface IUsersRepository {
    createState({
        state,
        expiration,
    }:{
        state: string,
        expiration: string
    }): Promise<{ state: string; expiration: string }>

    retrieveState(state: string): Promise<string | null>
}
