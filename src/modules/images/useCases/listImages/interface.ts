import { ImagesPagination } from "../../typeDefs/ImagesPagination";

export interface IListImagesUseCase {
    execute({ 
        data,
    } : IListImagesUseCaseDTO): Promise<ImagesPagination>
}

export type IListImagesUseCaseDTO = {
    data: {
        skip?: number,
        take?: number,
        orderBy?: string,
        orderDirection?: string,
        name?: string,
        description?: string,
        tags?: string[],
        user_id?: string,
        image_url?: string,
    },
}