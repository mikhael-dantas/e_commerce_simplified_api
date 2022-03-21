import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class FindUserByIdUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute( id: string ): Promise<User> {
      const user = await this.usersRepository.findById(id);
      if (!user) {
         throw new Error("User not found");
      }
      return user
   }

}

export { FindUserByIdUseCase }; 