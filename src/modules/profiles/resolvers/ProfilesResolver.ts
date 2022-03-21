import { Resolver, Query, Arg, Mutation, Args, FieldResolver, Root } from "type-graphql";
import { FindUserByIdUseCase } from "../../users/useCases/FindUserById/FindUserByIdUseCase";

import { createProfileInput, profilesArgs } from "../DTOs/ProfilesDTOs";
import { Profile } from "../typeDefs/ProfileTypeDef";
import { CreateProfileUseCase } from "../useCases/CreateProfile/CreateProfileUseCase";
import { ListProfilesUseCase } from "../useCases/ListProfiles/ListUsersUseCase";

@Resolver(Profile)
class ProfilesResolver {

   @Mutation(returns => Profile)
   createProfile( @Arg("data") { bio, user_id }: createProfileInput
   ): Promise<Profile> {
      const createProfileUseCase = new CreateProfileUseCase();
      return createProfileUseCase.execute({ bio, user_id });
   }

   @Query(returns => [Profile])
   async profiles(@Args() { skip, take }: profilesArgs): Promise<Profile[]> {
      const listProfilesUseCase = new ListProfilesUseCase();
      const profiles = await listProfilesUseCase.execute();
      return profiles
   }

   @FieldResolver()
   async user (@Root() profile: Profile) {
      const findUserByIdUseCase = new FindUserByIdUseCase();
      const user = await findUserByIdUseCase.execute( profile.user_id );
      if (!user) {
         throw new Error("User not found");
      }
      return user;
   }
}

export { ProfilesResolver };
