import { Image } from "../typeDefs/Image";

export type TCreateImageDTO = { 
    name: string, description: string, tags: string[], image_url: string, user_id: string 
}

export interface IImagesRepository {
    create({ 
        name, description, tags, image_url, user_id
    } : TCreateImageDTO): Promise<Image>
}