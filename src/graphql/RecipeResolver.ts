import { Resolver, Query} from "type-graphql";
import  { Recipe } from "./Recipe";

@Resolver(Recipe)
class RecipeResolver {
   // constructor(private recipeService: RecipeService) {}

   // @Query(returns => Recipe)
   // async recipe(@Arg("id") id: string) {
   //    const recipe = await this.recipeService.findById(id);
   //    if (recipe === undefined) {
   //       throw new RecipeNotFoundError(id);
   //    }
   //    return recipe;
   // }

   @Query(returns => [Recipe])
   // recipes(@Args() { skip, take }: RecipesArgs) {
   recipes() {
      // return this.recipeService.findAll({ skip, take });
      return [
         {
            id: "1",
            title: "The Awakening",
            description: "A book about the awakening",
            creationDate: new Date(),
            ingredients: ["paper", "pencil"],
         },
      ];
   }

   // @Mutation(returns => Recipe)
   // @Authorized()
   // addRecipe(
   //    @Arg("newRecipeData") newRecipeData: NewRecipeInput,
   //    @Ctx("user") user: User,
   // ): Promise<Recipe> {
   //    return this.recipeService.addNew({ data: newRecipeData, user });
   // }

   // @Mutation(returns => Boolean)
   // @Authorized(Roles.Admin)
   // async removeRecipe(@Arg("id") id: string) {
   //    try {
   //       await this.recipeService.removeById(id);
   //       return true;
   //    } catch {
   //       return false;
   //    }
   // }
}

export { RecipeResolver };