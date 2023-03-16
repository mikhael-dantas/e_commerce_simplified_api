import { UnauthorizedError } from "../../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError";
import { LoginRegistry } from "../../typeDefs/LoginRegistry";

export interface ICreateLoginRegistryUseCase {
    execute({
        accessToken,
        secret,
    }:{
        accessToken: string,
        secret: string
    }): Promise<LoginRegistry | UnauthorizedError>
}