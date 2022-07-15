import { container } from "tsyringe";
import { Arg, Ctx, Query } from "type-graphql";
import { IContext } from "../../../app";
import { FindProductUseCase } from "../useCases/FindProduct/FindProduct";
import { IListProductsArgs } from "../useCases/ListProducts/IListProducts";
import { ListProductsUseCase } from "../useCases/ListProducts/ListProducts";
import { FindProductResults, ListProductsResults } from "./ResolverResults";



export class ProductsResolver {
   @Query(returns => [ListProductsResults])
   async products(
      @Arg("skip") skip: number,
      @Arg("take") take: number,
      @Ctx() context: IContext
   ): Promise<typeof FindProductResults[]> {
      const authHeader = context.req.headers.authorization;

      const listProductsUseCase = container.resolve(ListProductsUseCase);
      const data: IListProductsArgs = {
         authHeader,
         skip,
         take,
      };
      const products = await listProductsUseCase.execute(data);
      return products;
   }

   @Query(returns => [FindProductResults])
   async product(
      @Arg("id") id: string,
      @Ctx() context: IContext
   ): Promise<typeof FindProductResults[]> {
      const authHeader = context.req.headers.authorization;

      const findProductUseCase = container.resolve(FindProductUseCase);
      const product = await findProductUseCase.execute(id);
      return product;
   }
}