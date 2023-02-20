export type ILoginAttemptInitResponse = {
    model: 'LoginAttemptInitResponse'
    state: string;
    expiration: string;
};

export interface ILoginAttemptInit {
    execute(): Promise<ILoginAttemptInitResponse>
}