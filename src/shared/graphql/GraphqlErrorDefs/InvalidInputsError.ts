import { ObjectType, Field } from "type-graphql";



@ObjectType()
class InvalidInputsInfo {
    @Field()
    location: string;
    @Field()
    message: string;
}

type IInvalidInputsInfo = {
    location: string;
    message: string;
}

@ObjectType()
export class InvalidInputsError {
    @Field()
    model: string ="InvalidInputsError";

    @Field(() => [InvalidInputsInfo])
    inputs: IInvalidInputsInfo[];

    @Field()
    status: number = 400;
}
