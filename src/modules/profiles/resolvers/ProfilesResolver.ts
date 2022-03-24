import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root, Ctx } from "type-graphql";
import { container } from "tsyringe";

import { Profile } from "../typeDefs/ProfileTypeDef";

import { createProfileInput, profilesArgs } from "../DTOs/ProfilesDTOs";
import { FieldsToSearchUser } from "../../users/DTOs/UsersDTOs";

import { CreateProfileUseCase } from "../useCases/CreateProfile/CreateProfileUseCase";
import { ListProfilesUseCase } from "../useCases/ListProfiles/ListUsersUseCase";
import { FindProfileByUserIdUseCase } from "../useCases/FindProfileByUserId/FindProfileByUserIdUseCase";
import { FindUserUseCase } from "../../users/useCases/FindUser/FindUserUseCase";
import { IContext } from "../../../app";
import { CreateProfileResults, SearchProfileResults, SearchProfilesResults } from "./ResolverResults";
import { SearchUserResults } from "../../users/resolvers/ResolverResults";

@Resolver(Profile)
class ProfilesResolver {

   @Mutation(returns => CreateProfileResults)
   async createProfile(
      @Arg("data") { bio, user_id }: createProfileInput,
      @Ctx() context: IContext,
   ): Promise<typeof CreateProfileResults> {
      const authHeader = context.req.headers.authorization;

      const createProfileUseCase = container.resolve(CreateProfileUseCase);
      return await createProfileUseCase.execute(authHeader, { bio, user_id });
   }

   @Query(returns => [SearchProfilesResults])
   async profiles(@Args() { skip, take }: profilesArgs): Promise<(typeof SearchProfilesResults)[]> {
      const listProfilesUseCase = container.resolve(ListProfilesUseCase);
      const profiles = await listProfilesUseCase.execute();
      return profiles
   }

   @Query(returns => SearchProfileResults)
   async profile(@Arg("user_id") user_id: string): Promise<typeof SearchProfileResults> {
      const findProfileByUserIdUseCase = container.resolve(FindProfileByUserIdUseCase);
      const profile = await findProfileByUserIdUseCase.execute(user_id);
      return profile
   }

   @FieldResolver()
   async user (
      @Root() profile: Profile,
      @Ctx() context: IContext,
      ): Promise<typeof SearchUserResults> {
      const authHeader = context.req.headers.authorization;

      const findUserUseCase = container.resolve(FindUserUseCase);
      const user = await findUserUseCase.execute( authHeader ,FieldsToSearchUser.Id, profile.user_id );
      return user;
   }
}

export { ProfilesResolver };
