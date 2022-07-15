import { ArgsType, Field, registerEnumType } from "type-graphql";

@ArgsType()
export class PaginationArgs {
   @Field({nullable: true})
   take: number;
   
   @Field({nullable: true})
   skip: number;
}

export enum Order {
   ASC = "asc",
   DESC = "desc",
}

registerEnumType(Order, {
   name: "Order", 
   description: "orders accepted by the query",
});