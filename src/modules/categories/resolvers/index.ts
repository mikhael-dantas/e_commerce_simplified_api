import { Category } from './../typeDefs/Category';
import { ListCategoriesUseCase } from './../useCases/ListCategories/index';
import { container } from 'tsyringe';
import { Arg, Mutation, Query } from "type-graphql";
import { CreateCategoryUseCase } from "../useCases/CreateCategory";
import { CategoriesResults, CreateCategoryResults } from './ResultsTypes';

export class CategoriesResolver {
    constructor(
        private injections?: {
            createCategoryUseCase?: CreateCategoryUseCase;
            listCategoriesUseCase?: ListCategoriesUseCase;
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

    @Query((returns) =>
        [CategoriesResults]
    )
    async categories(
        @Arg("skip") skip: number,
        @Arg("take") take: number,
    ): Promise<typeof CategoriesResults[]> {
        let useCase
        if (!this.injections?.listCategoriesUseCase) {
            useCase = container.resolve(ListCategoriesUseCase);
        } else {
            useCase = this.injections.listCategoriesUseCase;
        }

        const listCategoriesResponse = await useCase.execute({
            skip,
            take,
        });

        return listCategoriesResponse;
    }
}