import { Product } from "../typeDefs/Product";


export interface IProductsRepository {
   getAll: (skip: number, take: number) => Promise<Product[]>;
   getById: (id: string) => Promise<Product | null>;
   // create: (data: ICreateProfileDTO) => Promise<Profile>;
}