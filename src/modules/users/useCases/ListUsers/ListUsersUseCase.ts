import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class ListUsersUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute(): Promise<User[]> {
      const users = await this.usersRepository.findAll();
      return users
   }

}

export { ListUsersUseCase };