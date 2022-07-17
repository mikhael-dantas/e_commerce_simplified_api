import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Product {
   @Field()
   model: string;

   @Field()
   id: string;

   @Field()
   name: string;

   @Field()
   price: number;

   @Field()
   description: string;

   @Field()
   stock: number;

   @Field()
   created_at: Date;

   @Field()
   updated_at: Date;

}

export { Product };