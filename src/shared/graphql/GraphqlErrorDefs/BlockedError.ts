
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BlockedError {
    @Field()
    model: string ="blockedError";

    @Field()
    message: string = "Blocked";

    @Field()
    status: number = 400;
}
