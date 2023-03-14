import { Arg, Int, Mutation, Query } from "type-graphql";
import { ICreateImageUseCase } from "../useCases/createImage/interface";
import { createImageResults, getImagesResults } from "./ResultTypes";
import { container } from "tsyringe";
import { CreateImageUseCase } from "../useCases/createImage";
import { IListImagesUseCase } from "../useCases/listImages/interface";
import { ListImagesUseCase } from "../useCases/listImages";

export class ImagesResolver {
    constructor(
        private injections?: {
            createImageUseCase?: ICreateImageUseCase;
            listImagesUseCase?: IListImagesUseCase;
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

    @Query(returns => getImagesResults)
    async getImages(
        @Arg('skip', () => Int, { nullable: true }) skip?: number,
        @Arg('take', () => Int, { nullable: true }) take?: number,
        @Arg('orderBy', () => String, { nullable: true }) orderBy?: string,
        @Arg('orderDirection', () => String, { nullable: true }) orderDirection?: string,
        @Arg('name', () => String, { nullable: true }) name?: string,
        @Arg('description', () => String, { nullable: true }) description?: string,
        @Arg('tags', () => [String], { nullable: true }) tags?: string[],
        @Arg('user_id', () => String, { nullable: true }) user_id?: string,
        @Arg('image_url', () => String, { nullable: true }) image_url?: string,
    ): Promise<typeof getImagesResults> {
        let useCase
        if (!this.injections?.listImagesUseCase) {useCase = container.resolve(ListImagesUseCase);
        } else { useCase = this.injections.listImagesUseCase; }


        const listImagesResponse = await useCase.execute({
            data: {
                skip,
                take,
                orderBy,
                orderDirection,
                name,
                description,
                tags,
                user_id,
                image_url
            },
        });

        return listImagesResponse
    }

}