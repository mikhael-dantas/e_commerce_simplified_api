import { container } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { User } from "../../typeDefs/UserTypeDef";

class FindUserByIdUseCase {
   private readonly usersRepository: IUsersRepository;

   constructor() {
      this.usersRepository = container.resolve(UsersRepository);
   }

   async execute( id: string ): Promise<User> {
      const user = await this.usersRepository.findById(id);
      if (!user) {
         throw new Error("User not found");
      }
   
      return user
   }

}

export { FindUserByIdUseCase };