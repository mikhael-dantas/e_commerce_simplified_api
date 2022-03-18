import { Resolver, Query} from "type-graphql";
import  { Post } from "./Post";

@Resolver(Post)
class PostResolver {
   // @Query(returns => Post)
   // async Post(@Arg("id") id: string) {
   //    const Post = await this.postservice.findById(id);
   //    if (Post === undefined) {
   //       throw new PostNotFoundError(id);
   //    }
   //    return Post;
   // }

   @Query(returns => [Post])
   // posts(@Args() { skip, take }: postsArgs) {
   posts() {
      // return this.postservice.findAll({ skip, take });
      return [
         {
            id: "1",
            title: "The Awakening",
            content: "A book about the awakening",
            published: false,
            created_at: new Date(),
            updated_at: new Date(),
            author_id: "tyhsndsy",
         },
      ];
   }

   // @Mutation(returns => Post)
   // @Authorized()
   // addPost(
   //    @Arg("newPostData") newPostData: NewPostInput,
   //    @Ctx("user") user: User,
   // ): Promise<Post> {
   //    return this.postservice.addNew({ data: newPostData, user });
   // }

   // @Mutation(returns => Boolean)
   // @Authorized(Roles.Admin)
   // async removePost(@Arg("id") id: string) {
   //    try {
   //       await this.postservice.removeById(id);
   //       return true;
   //    } catch {
   //       return false;
   //    }
   // }
}

export { PostResolver };