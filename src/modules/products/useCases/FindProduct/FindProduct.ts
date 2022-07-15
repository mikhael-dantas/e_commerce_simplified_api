import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "../../typeDefs/Product";
import { IFindProductUseCase } from "./IFindProduct";

@injectable()
export class FindProductUseCase implements IFindProductUseCase {
   constructor(
      @inject("ProductsRepository")
      private readonly productsRepository: IProductsRepository,
   ) {}

   async execute(id: string): Promise<Product[]> {
      const product = await this.productsRepository.getById(id);
      if (!product) {
         return [];
      }
      return [product];
   }
}