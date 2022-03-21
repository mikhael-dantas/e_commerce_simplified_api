import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../DTOs/UsersDTOs";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class CreateUserUseCase {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,
   ) {}

   async execute(createUserDTO: ICreateUserDTO): Promise<User> {
      const user = this.usersRepository.create(createUserDTO);

      return user;
   }
}

export { CreateUserUseCase };