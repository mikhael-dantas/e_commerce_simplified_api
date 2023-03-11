import { inject, injectable } from "tsyringe";
import { IImagesRepository, TCreateImageDTO } from "./interface";
import { Image } from "../typeDefs/Image";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

@injectable()
export class ImagesRepository implements IImagesRepository {
    constructor(
        @inject("PrismaClient")
        private prismaClient: PrismaClient,
    ) {}
    async create({ 
        name, description, tags, image_url, user_id
    } : TCreateImageDTO) {
        const image = await this.prismaClient.image.create({
            data: {
                id: randomUUID(),
                name,
                description,
                tags,
                image_url,
                user_id,
            }
        })

        return image as Image
    }
}