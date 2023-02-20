import { randomUUID } from 'crypto';
import { inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginAttemptInit, ILoginAttemptInitResponse} from "./Interface";


export class LoginAttemptInit implements ILoginAttemptInit {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(): Promise<ILoginAttemptInitResponse> {
        const state = randomUUID()

        const loginAttempt = await this.usersRepository.createState({
            state,
            expiration: '60'
        });

        return {
            model: 'LoginAttemptInitResponse',
            state: loginAttempt.state,
            expiration: loginAttempt.expiration,
        };
    }
}