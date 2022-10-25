import { PrismaClient } from "@prisma/client"
import { inject, injectable } from "tsyringe"
import { Category } from "../typeDefs/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository"
import { v4 as uuidv4 } from 'uuid';


@injectable()
export class CategoriesRepository implements ICategoriesRepository {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient
    ) {}
    async create(
        {
            name,
            description,
            image_id,
            image_url,
            inactive,
        }: ICreateCategoryDTO): Promise<Category> {
        return await this.prisma.category.create({
            data: {
                id: uuidv4(),
                name,
                description,
                image_id,
                image_url,
                inactive
            }
        })
    }

    async list({ skip, take }: { skip: number; take: number }): Promise<Category[]> {
        return await this.prisma.category.findMany({
            skip,
            take
        })
    }
}