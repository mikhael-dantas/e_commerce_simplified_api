import { Product } from "../../typeDefs/Product";

export interface IFindProductUseCase {
   execute: (id: string) => Promise<Product[]>;
}