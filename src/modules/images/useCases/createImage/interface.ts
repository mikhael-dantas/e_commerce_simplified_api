import { UnauthorizedError } from "../../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError";
import { CheckAccessTokenUseCase } from "../../../users/useCases/CheckAccessToken";
import { FindUserByIdUseCase } from "../../../users/useCases/FindUserById";
import { Image } from "../../typeDefs/Image";

export interface ICreateImageUseCase {
    execute({ 
        data,
        injections
    }: TCreateImageUseCaseDTO): Promise<Image | UnauthorizedError>
}

export type TCreateImageUseCaseDTO = {
    data: {
        name: string,
        description: string,
        tags: string[],
        image_url: string,
        accessToken: string,
    },
    injections?: {
        findUserById: FindUserByIdUseCase,
        checkAccessToken: CheckAccessTokenUseCase
    }
}