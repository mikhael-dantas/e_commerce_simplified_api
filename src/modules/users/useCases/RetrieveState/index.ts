import { inject } from 'tsyringe';
import { IRetrieveStateUseCase } from "./interface";
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { OperationResponse } from '../../../../shared/graphql/OperationResponse';


export class RetrieveStateUseCase implements IRetrieveStateUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(state: string): Promise<OperationResponse> {
        const retrievedState = await this.usersRepository.retrieveState(state);
        if (!retrievedState) {
            return {
                model: 'operationResponse',
                message: 'Could not retrieve state',
                status: 'fail'
            };
        }
        return {
            model: 'operationResponse',
            message: 'State retrieved successfully',
            status: 'success'
        };
    }
} 