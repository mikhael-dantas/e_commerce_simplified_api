import { Image } from "@prisma/client";
import { injectable, inject } from "tsyringe";
import { IImagesRepository } from "../../repositories/interface";
import { IListImagesUseCase, IListImagesUseCaseDTO } from "./interface";
import { ImagesPagination } from "../../typeDefs/ImagesPagination";

@injectable()
export class ListImagesUseCase implements IListImagesUseCase {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImagesRepository
    ) {}

    async execute(data: IListImagesUseCaseDTO): Promise<ImagesPagination> {
        let { skip, take, orderBy, orderDirection, name, description, tags, user_id, image_url } = data.data;

        if (!skip) {skip = 0;}
        if (!take) {take = 10;}

        const filters = {
            name, description, tags, user_id, image_url
        }

        const pagination = {
            skip, take, orderBy, orderDirection
        }

        const images = await this.imagesRepository.list({
            filters, pagination
        });

        const count = await this.imagesRepository.count({
            filters
        });


        const cursor = count > (skip + take) ? skip + take : 0;


        return {
            model: 'imagesPagination',
            data: images,
            count,
            cursor
        }
    }
}