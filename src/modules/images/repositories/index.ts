import { inject, injectable } from "tsyringe";
import { IImagesRepository, TCreateImageDTO, TListImagesFilters, TPaginationOptions } from "./interface";
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

    async list({
        filters, pagination
    } : {
        filters: TListImagesFilters,
        pagination: TPaginationOptions
    }) {
        const images = await this.prismaClient.image.findMany({
            where: {
                name: filters.name,
                description: filters.description,
                tags: {
                    array_contains: filters.tags
                },
                user_id: filters.user_id,
                image_url: filters.image_url,
            },
            skip: pagination.skip,
            take: pagination.take,
            orderBy:{
                [pagination.orderBy ? pagination.orderBy as string : "created_at"]: 
                pagination.orderDirection ? pagination.orderDirection as string : "desc"
            }
        })

        return images as Image[]
    }

    async count({ filters }: { filters: TListImagesFilters }) {
        const count = await this.prismaClient.image.count({
            where: {
                name: filters.name,
                description: filters.description,
                tags: {
                    array_contains: filters.tags
                },
                user_id: filters.user_id,
                image_url: filters.image_url,
            }
        })

        return count
    }
}