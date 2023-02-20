export type IState = {
    model: 'state'
    state: string;
    expiration: string;
};

export interface ILoginAttemptInit {
    execute(): Promise<IState>
}