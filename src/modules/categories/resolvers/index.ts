import { container } from 'tsyringe';
import { Arg, Mutation } from "type-graphql";
import { CreateCategoryUseCase } from "../useCases/CreateCategory/CreateCategoryUseCase";
import { CreateCategoryResults } from './ResultsTypes';

export class CategoriesResolver {
    constructor(
        private injections?: {
            createCategoryUseCase?: CreateCategoryUseCase;
        }
    ) {}
    @Mutation(returns => CreateCategoryResults)
    async createCategory(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("image_id") image_id: string,
        @Arg("image_url") image_url: string,
        @Arg("inactive") inactive: boolean,
        // @Ctx() context: IContext
    ): Promise<typeof CreateCategoryResults> {
        // const authHeader = context.req.headers.authorization;
        let useCase
        if (!this.injections?.createCategoryUseCase) {
            useCase = container.resolve(CreateCategoryUseCase);
        } else {
            useCase = this.injections.createCategoryUseCase;
        }

        const createCategoryResponse = await useCase.execute({
            name,
            description,
            image_id,
            image_url,
            inactive,
        });
        return createCategoryResponse
    }
    }