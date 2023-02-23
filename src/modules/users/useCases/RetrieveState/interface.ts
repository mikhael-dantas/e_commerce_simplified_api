import { OperationResponseTypeDef } from "../../../../shared/graphql/OperationResponse";

export interface IRetrieveStateUseCase {
    execute(state: string): Promise<OperationResponseTypeDef>
}