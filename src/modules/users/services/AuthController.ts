import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthUserUseCase } from "../useCases/AuthUser/AuthUserUseCase";


export class AuthUserController {
   async create(request: Request, response: Response): Promise<Response> {
      const { email, password } = request.body;
      const authUserUseCase = container.resolve(AuthUserUseCase);

      const { user, token } = await authUserUseCase.execute({ email, password });

      return response.json({ user, token });
   }
}