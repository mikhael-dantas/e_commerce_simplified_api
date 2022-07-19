import { Manager } from "../../typeDefs/Manager"


export interface ICreateManagerDTO {
   name: string
   email: string
   password: string
}

export interface ICreateManagerUseCase {
   execute: (data: ICreateManagerDTO) => Promise<Manager>
}