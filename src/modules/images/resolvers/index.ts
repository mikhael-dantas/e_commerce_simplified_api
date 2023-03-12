import { Arg, Mutation } from "type-graphql";
import { ICreateImageUseCase } from "../useCases/createImage/interface";
import { createImageResults } from "./ResultTypes";
import { container } from "tsyringe";
import { CreateImageUseCase } from "../useCases/createImage";

export class ImagesResolver {
    constructor(
        private injections?: {
            createImageUseCase?: ICreateImageUseCase;
        }
    ) {}

    @Mutation(returns => createImageResults)
    async createImage(
        @Arg('accessToken') accessToken: string,
        @Arg('name') name: string,
        @Arg('description') description: string,
        @Arg('image_url') image_url: string,
        @Arg('tags', () => [String]) tags: string[],
    ): Promise<typeof createImageResults> {
        let useCase
        if (!this.injections?.createImageUseCase) {
            useCase = container.resolve(CreateImageUseCase);
        } else {
            useCase = this.injections.createImageUseCase;
        }

        const createImageResponse = await useCase.execute({
            data: {
                name,
                description,
                image_url,
                tags,
                accessToken
            },
        });

        return createImageResponse
    }



}