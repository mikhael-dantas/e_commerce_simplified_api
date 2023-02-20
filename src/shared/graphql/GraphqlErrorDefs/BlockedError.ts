
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BlockedErrorTypeDef {
    @Field()
    model: string ="blockedErrorTypeDef";

    @Field()
    message: string = "Blocked";

    @Field()
    status: number = 400;
}
