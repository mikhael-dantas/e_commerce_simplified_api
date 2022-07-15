import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { Product } from "../typeDefs/Product";
import { IProductsRepository } from "./IProductsRepository";

@injectable()
export class ProductsRepository implements IProductsRepository {
   constructor(
      @inject("PrismaClient")
      private dbCli: PrismaClient,
   ) {}

   async getAll(skip: number, take: number): Promise<Product[]> {
      const products = await this.dbCli.product.findMany({  
         skip,
         take,
      });
      return products;
   }
   async getById(id: string): Promise<Product | null> {
      const product = await this.dbCli.product.findUnique({
         where: {
            id,
         },
      })
      return product;
   }
}