import { ICreateProfileDTO } from '../DTOs/ProfilesDTOs';
import { Profile } from '../typeDefs/ProfileTypeDef';



export interface IProfilesRepository {
   create: (data: ICreateProfileDTO) => Promise<Profile>;
   findAll: () => Promise<Profile[]>;
   findById: (id: string) => Promise<Profile | null>;
   findByUserId: (user_id: string) => Promise<Profile | null>;
}