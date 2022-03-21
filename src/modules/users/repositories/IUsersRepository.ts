import { ICreateUserDTO } from '../DTOs/UsersDTOs';
import { User } from '../typeDefs/UserTypeDef'



export interface IUsersRepository {
   create: (data: ICreateUserDTO) => Promise<User>;
   findAll: () => Promise<User[]>;
   findByEmail: (email: string) => Promise<User | null>;
   findById: (user_id: string) => Promise<User | null>;
}