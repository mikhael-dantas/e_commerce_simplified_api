import { createUnionType } from "type-graphql";
import { Manager } from "../typeDefs/Manager";

export const CreateManagerResults = createUnionType({
   name: "CreateManagerResults",
   types: () => [
      Manager,
   ] as const,  
   resolveType: value => {
      if (value.model == "manager") {
         return Manager;
      }
      undefined;
   },
})

// export const ListManagersResults = createUnionType({
//    name: "ListManagersResults",
//    types: () => [
//       Manager,
//    ] as const, 
//    resolveType: value => {
//       if (value.model == "product") {
//          return Manager;
//       }
//       undefined;
//    },
// })

// export const FindManagerResults = createUnionType({
//    name: "FindManagerResults",
//    types: () => [
//       Manager,
//    ] as const,
//    resolveType: value => {
//       if (value.model == "product") {
//          return Manager;
//       }
//       undefined;
//    }
// })