import { container, inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOs/DTOs";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

@injectable()
class CreateUserUserCase {
   private readonly usersRepository: IUsersRepository;
   constructor() {
      this.usersRepository = container.resolve(UsersRepository);
   }

   async execute(createUserDTO: ICreateUserDTO) {
      const user = this.usersRepository.create(createUserDTO);

      return user;
   }
}

export { CreateUserUserCase };