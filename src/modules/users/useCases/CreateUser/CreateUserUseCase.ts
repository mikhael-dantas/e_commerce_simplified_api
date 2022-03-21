import { hash } from "bcryptjs";
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
      const hashedPassoword = await hash(createUserDTO.password, 8);

      const newDTO = {
         name: createUserDTO.name,
         email: createUserDTO.email,
         password: hashedPassoword,
      };

      const user = this.usersRepository.create(newDTO);

      return user;
   }
}

export { CreateUserUseCase };