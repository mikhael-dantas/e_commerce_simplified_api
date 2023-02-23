import { inject } from 'tsyringe';
import { IRetrieveStateUseCase } from "./interface";
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { OperationResponseTypeDef } from '../../../../shared/graphql/OperationResponse';


export class RetrieveStateUseCase implements IRetrieveStateUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(state: string): Promise<OperationResponseTypeDef> {
        const retrievedState = await this.usersRepository.retrieveState(state);
        if (!retrievedState) {
            return {
                model: 'operationResponseTypeDef',
                message: 'Could not retrieve state',
                status: 'error'
            };
        }
        return {
            model: 'operationResponseTypeDef',
            message: 'State retrieved successfully',
            status: 'success'
        };
    }
} 