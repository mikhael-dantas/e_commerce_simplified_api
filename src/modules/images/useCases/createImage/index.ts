import { container, inject, injectable } from "tsyringe"
import { UnauthorizedError } from "../../../../shared/graphql/GraphqlErrorDefs/UnauthorizedError"
import { CheckAccessTokenUseCase } from "../../../users/useCases/CheckAccessToken"
import { FindUserByIdUseCase } from "../../../users/useCases/FindUserById"
import { IImagesRepository } from "../../repositories/interface"
import { ICreateImageUseCase, TCreateImageUseCaseDTO } from "./interface"

@injectable()
export class CreateImageUseCase implements ICreateImageUseCase {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImagesRepository,
    ) {}

    async execute({ 
        data,
        injections = {
            findUserById: container.resolve(FindUserByIdUseCase),
            checkAccessToken: container.resolve(CheckAccessTokenUseCase)
        }
    }: TCreateImageUseCaseDTO) {
        const { findUserById, checkAccessToken } = injections
        const permissions = ["manager"]

        const secret = process.env.AUTH0_PUBLIC_KEY
        if (!secret) {throw new Error("Secret not found")}

        let sub: string

        try {
        const accessTokenCheck = await checkAccessToken.execute({ 
            token : data.accessToken, 
            secret,
            algorithm: process.env.NODE_ENV === "test" ? "HS256" : "RS256",
            permissions: permissions
        })
        sub = accessTokenCheck.sub as string
        } catch (err) { return new UnauthorizedError() }


        const user = await findUserById.execute({ id: sub }).catch(() => {return null})

        if (!user) {
            const error = new UnauthorizedError()
            error.message = "User not found"
            return error
        }

        const image = await this.imagesRepository.create({
            name: data.name,
            description: data.description,
            tags: data.tags,
            image_url: data.image_url,
            user_id: user.id,
        })

        return image
    }
}