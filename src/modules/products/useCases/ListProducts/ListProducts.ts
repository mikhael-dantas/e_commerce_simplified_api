import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { Product } from "../../typeDefs/Product";
import { IListProductsArgs, IListProductsUseCase } from "./IListProducts";

@injectable()
export class ListProductsUseCase implements IListProductsUseCase {
   constructor(
      @inject("ProductsRepository")
      private readonly productsRepository: IProductsRepository,
   ) {}

   public async execute(data: IListProductsArgs): Promise<Product[]> {
      return await this.productsRepository.getAll(data.skip, data.take);
   }
}