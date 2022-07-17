import { returnApp } from "../../src/app"
import http from "http"

describe("integration tests", () => {
   let app: http.Server
   beforeAll(async () => {
      const server = await returnApp()
      await new Promise(resolve => {
         app = server.listen(3001, () => {
            resolve("server started")
         })
      })
   })
   afterAll(async () => {
      app.close()
      // wait until the server emits a "close" event
      await new Promise(resolve => app.on("close", () => {
      resolve('done')
      }))
   })


   test("should be able to get a list of products", async () => {
      const postData = JSON.stringify({
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
      })

      let options = {
         hostname: "localhost",
         port: 3001,
         method: "POST",
         path: "/graphql",
         headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
         },
      }

      await new Promise(resolve => {
         const req = http.request(options, res => {
            let chunks: any[] = []
            res.on("data", chunk => {
               chunks.push(chunk)
            })
            res.on("end", () => {
               const body = Buffer.concat(chunks).toString()
               console.log(body)
               // expect(body).toMatchSnapshot()
            })
         })
         req.write(postData)
         req.end()
         req.on("close", () => {
            resolve('done')
         })
      })
   })
})