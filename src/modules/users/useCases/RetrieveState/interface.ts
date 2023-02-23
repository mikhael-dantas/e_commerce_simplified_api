import { OperationResponse } from "../../../../shared/graphql/OperationResponse";

export interface IRetrieveStateUseCase {
    execute(state: string): Promise<OperationResponse>
}