import { Manager } from "../typeDefs/Manager";

export interface IManagersRepository {
   create(name: string, email: string, password: string): Promise<Manager>
}