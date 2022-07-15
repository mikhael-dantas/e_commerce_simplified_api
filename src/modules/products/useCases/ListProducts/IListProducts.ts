import { Product } from "../../typeDefs/Product";

export interface IListProductsArgs {
   authHeader: string | undefined, 
   skip: number;
   take: number;
}

export interface IListProductsUseCase {
   execute: (data: IListProductsArgs) => Promise<Product[]>;
}