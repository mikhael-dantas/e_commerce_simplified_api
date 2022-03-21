import { inject, injectable } from "tsyringe";
import { FieldsToSearchUser } from "../../DTOs/UsersDTOs";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../typeDefs/UserTypeDef";

@injectable()
class FindUserUseCase {

   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {}

   async execute( field: FieldsToSearchUser, value: string ): Promise<User> {
      if (field === 'id') {
         const user = await this.usersRepository.findById(value);
         if (!user) {
            throw new Error('User not found');
         }
         return user;
      }

      if (field === 'email') {
         const user = await this.usersRepository.findByEmail(value);
         if (!user) {
            throw new Error('User not found');
         }
         return user;
      }

      throw new Error('Field to search not provided');
   }

}

export { FindUserUseCase }; 