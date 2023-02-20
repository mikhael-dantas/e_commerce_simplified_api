import { randomUUID } from 'crypto';
import { inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ILoginAttemptInit, IState} from "./Interface";


export class LoginAttemptInit implements ILoginAttemptInit {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(): Promise<IState> {
        const state = randomUUID()

        const loginAttempt = await this.usersRepository.createState({
            state,
            expiration: '60'
        });

        return {
            model: 'state',
            state: loginAttempt.state,
            expiration: loginAttempt.expiration,
        };
    }
}