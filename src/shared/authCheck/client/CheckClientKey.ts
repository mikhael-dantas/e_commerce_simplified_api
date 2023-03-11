import { UnauthorizedError } from "../../graphql/GraphqlErrorDefs/UnauthorizedError"

export interface ICheckClientKeyUseCase {
    execute({ clientKey }: { clientKey: string }): {authorized: boolean} | UnauthorizedError
}

export class CheckClientKeyUseCase implements ICheckClientKeyUseCase {
    execute({ clientKey }: { clientKey: string }) {
        if (clientKey === process.env.CLIENT_KEY) {
            return { authorized: true }
        } else {
            return new UnauthorizedError()
        }
    }
}