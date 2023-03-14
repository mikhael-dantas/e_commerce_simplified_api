import { Image } from "../typeDefs/Image";

export type TCreateImageDTO = { 
    name: string, description: string, tags: string[], image_url: string, user_id: string 
}

export type TListImagesFilters = {
    name?: string, description?: string, tags?: string[], user_id?: string, image_url?: string
}

export type TPaginationOptions = {
    skip: number, take: number, orderBy?: string, orderDirection?: string
}

export type TListImagesDTO = {
    filters: TListImagesFilters,
    pagination: TPaginationOptions
}

export interface IImagesRepository {
    create({ 
        name, description, tags, image_url, user_id
    } : TCreateImageDTO): Promise<Image>

    list({
        filters, pagination
    } : TListImagesDTO): Promise<Image[]>

    count({ filters }: { filters: TListImagesFilters }): Promise<number>
}