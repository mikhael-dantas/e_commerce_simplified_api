import { container } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

class ListUsersUseCase {
   private readonly usersRepository: IUsersRepository;

   constructor() {
      this.usersRepository = container.resolve(UsersRepository);
   }

   async execute() {
      const users = await this.usersRepository.findAll();
      return users
   }

}

export { ListUsersUseCase };