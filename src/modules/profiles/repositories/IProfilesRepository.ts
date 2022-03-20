import { ICreateProfileDTO } from '../DTOs/ProfilesDTOs';
import { Profile } from '../typeDefs/ProfileTypeDef';



export interface IProfilesRepository {
   create: (data: ICreateProfileDTO) => Promise<Profile>;
   findAll: () => Promise<Profile[]>;
}