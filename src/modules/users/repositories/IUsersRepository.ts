import { ICreateUserDTO, IFindAllDTO } from '../DTOs/UsersDTOs';
import { User } from '../typeDefs/UserTypeDef'

export interface IUsersRepository {
   create: (data: ICreateUserDTO) => Promise<User>;
   findAll: (data: IFindAllDTO) => Promise<User[]>;
   findByEmail: (email: string) => Promise<User | null>;
   findById: (user_id: string) => Promise<User | null>;
}