// control424242// controlLabel3q1sfwmxwa1jfzfpo3fqsjcontrol424242

import axios from "axios";
import {IMyCustomOptions} from "../../../../jest.globalSetup"
const {__myCustomOptions__} = globalThis as any;
const myCustomOptions: IMyCustomOptions = __myCustomOptions__

describe('integration tests', () => {

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// e7bbc225-b3ef-4bfb-a0f3-b0c591bc4ecb have a proper schema with: id, name, price, description, stock, inactive, deletion_mark
test.concurrent('have a proper schema with: id, name, price, description, stock, inactive, deletion_mark', async () => {expect(false).toBe(true)});

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// 523325ed-3ee2-42c9-9c36-8cef071db427 be able to be created only by an active manager passing [name, price, description, stock] [inactive: optional]
test.concurrent('be able to be created only by an active manager passing [name, price, description, stock] [inactive: optional]', async () => {expect(false).toBe(true)});

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// 706e0177-815d-4a25-ab1e-5b6e2a24d503 be searchable in the fields [id, name and price] of active products paginated passing options [skip, take]
test.concurrent('be searchable in the fields [id, name and price] of active products paginated passing options [skip, take]', async () => {
   const postData = {
      query: `
         query {
            products(
               skip: 0,
               take: 3,
            ) {
               __typename
               ... on Product {
                  name
               }
            }
         }`
   }

   

   const response = await axios.post(
      myCustomOptions.graphqlPath, postData, myCustomOptions.reqDefaultOptions
   )
   expect(response.status).toBe(200)
   expect(response.data).toHaveProperty("data")
});

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// c6cea720-1c54-4d0a-ad39-e2e45021ad3f be searchable in all fields of all products only by an active manager
test.concurrent('be searchable in all fields of all products only by an active manager', async () => {expect(false).toBe(true)});

// describeEndControlLabel4242
});