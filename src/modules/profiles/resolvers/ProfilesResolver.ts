import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root } from "type-graphql";
import { container } from "tsyringe";

import { User } from "../../users/typeDefs/UserTypeDef";
import { Profile } from "../typeDefs/ProfileTypeDef";

import { createProfileInput, profilesArgs } from "../DTOs/ProfilesDTOs";
import { FieldsToSearchUser } from "../../users/DTOs/UsersDTOs";

import { CreateProfileUseCase } from "../useCases/CreateProfile/CreateProfileUseCase";
import { ListProfilesUseCase } from "../useCases/ListProfiles/ListUsersUseCase";
import { FindProfileByUserIdUseCase } from "../useCases/FindProfileByUserId/FindProfileByUserIdUseCase";
import { FindUserUseCase } from "../../users/useCases/FindUser/FindUserUseCase";

@Resolver(Profile)
class ProfilesResolver {

   @Mutation(returns => Profile)
   async createProfile( @Arg("data") { bio, user_id }: createProfileInput
   ): Promise<Profile> {
      const createProfileUseCase = container.resolve(CreateProfileUseCase);
      return await createProfileUseCase.execute({ bio, user_id });
   }

   @Query(returns => [Profile])
   async profiles(@Args() { skip, take }: profilesArgs): Promise<Profile[]> {
      const listProfilesUseCase = container.resolve(ListProfilesUseCase);
      const profiles = await listProfilesUseCase.execute();
      return profiles
   }

   @Query(returns => Profile)
   async profile(@Arg("user_id") user_id: string): Promise<Profile> {
      const findProfileByUserIdUseCase = container.resolve(FindProfileByUserIdUseCase);
      const profile = await findProfileByUserIdUseCase.execute(user_id);
      return profile
   }

   @FieldResolver()
   async user (@Root() profile: Profile): Promise<User> {
      const findUserUseCase = container.resolve(FindUserUseCase);
      const user = await findUserUseCase.execute( FieldsToSearchUser.Id, profile.user_id );
      if (!user) {
         throw new Error("User not found");
      }
      return user;
   }
}

export { ProfilesResolver };
