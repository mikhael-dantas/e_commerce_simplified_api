

import { container, inject, injectable } from "tsyringe";
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { IContext } from "../../../app";
import { CreateManagerUseCase } from "../useCases/CreateManagerUseCase/CreateManagerUseCase";
import { CreateManagerResults } from "./ResolverResults";


export class ManagersResolver {
   constructor(
      private injections?: {
         createManagerUseCase?: CreateManagerUseCase;
      }
   ) {}
   @Mutation(returns => CreateManagerResults)
   async createManager(
      @Arg("name") name: string,
      @Arg("email") email: string,
      @Arg("password") password: string,
      // @Ctx() context: IContext
   ): Promise<typeof CreateManagerResults> {
      // const authHeader = context.req.headers.authorization;
      let useCase
      if (!this.injections?.createManagerUseCase) {
         useCase = container.resolve(CreateManagerUseCase);
      } else {
         useCase = this.injections.createManagerUseCase;
      }

      const manager = await useCase.execute({
         name,
         email,
         password,
      });
      return manager;
   }
}