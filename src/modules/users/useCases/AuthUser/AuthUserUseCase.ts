require('dotenv').config();

import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthUserDTO } from "../../DTOs/UsersDTOs";
import { IncorrectEmailOrPasswordError } from "./Errors";

interface IRequest {
   email: string;
   password: string;
}

@injectable()
export class AuthUserUseCase {
   private readonly secret: string
   private readonly tokenExpirationTime: string
   constructor(
      @inject('UsersRepository')
      private readonly usersRepository: IUsersRepository,
   ) {
      this.secret = process.env.JWT_SECRET as string;
      this.tokenExpirationTime = process.env.JWT_EXPIRATION_TIME as string;
   }

   async execute({ email, password }: IRequest): Promise<IAuthUserDTO> {
      const user = await this.usersRepository.findByEmail(email);

      if(!user) {
         throw new IncorrectEmailOrPasswordError();
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
         throw new IncorrectEmailOrPasswordError();
      }

      const token = sign({ user }, this.secret, {
         subject: user.id,
         expiresIn: this.tokenExpirationTime,
      });

      return {
         user: {
         id: user.id,
         name: user.name,
         email: user.email
         },
         token
      }
   }
}