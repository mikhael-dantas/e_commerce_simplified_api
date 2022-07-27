// control424242// controlLabel3q1sfwmxwa1jfzfpo3fqsjcontrol424242

describe('integration tests', () => {

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// 12bb5407-e15c-49d9-88bb-a52bb11933d9 have a proper schema with: [id, possesserID, active]
test.concurrent('have a proper schema with: [id, possesserID, active]', async () => {expect(false).toBe(true)});

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// 1b310da5-ad73-4caa-844f-6ee6d982f06f be able to be created only by a logged possesser by passing nothing
test.concurrent('be able to be created only by a logged possesser by passing nothing', async () => {
   // const manager = {
   //    name: "test manager",
   //    email: "test@gmail.com",
   //    password: "test",
   // }

   // const mutationData = JSON.stringify({
   //    query: `
   //       mutation {
   //          createManager(
   //             name: "${manager.name}",
   //             email: "${manager.email}",
   //             password: "${manager.password}"
   //          ) {
   //             __typename
   //             ... on Manager {
   //                name
   //             }
   //          }
   //       }
   //    `
   // })

   // const response = await axios.post(graphqlPath, mutationData, reqDefaultOptions)
   // expect(response.status).toBe(200)
   // expect(response.data.data.createManager.name).toBe(manager.name)
});

// controlLabel3q1sfwmxwa1jfzfpo3fqsj
// edeb5be7-eca4-4aab-b57c-f11524266c3d be able to be activated only by and admin manager by passing the manager [id]
test.concurrent('be able to be activated only by and admin manager by passing the manager [id]', async () => {expect(false).toBe(true)});

// describeEndControlLabel4242
});