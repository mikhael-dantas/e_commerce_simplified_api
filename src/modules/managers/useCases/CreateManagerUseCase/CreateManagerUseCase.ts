import { inject, injectable } from "tsyringe";
import { IManagersRepository } from "../../repositories/IManagersRepository";
import { Manager } from "../../typeDefs/Manager";
import { ICreateManagerDTO, ICreateManagerUseCase } from "./ICreateManagerUseCase";

@injectable()
export class CreateManagerUseCase implements ICreateManagerUseCase {
   constructor(
      @inject("ManagersRepository")
      private managersRepository: IManagersRepository
   ) {}

   public async execute(
      data: ICreateManagerDTO
   ): Promise<Manager> {
      return await this.managersRepository.create(
         data.name,
         data.email,
         data.password
      );
   }
}