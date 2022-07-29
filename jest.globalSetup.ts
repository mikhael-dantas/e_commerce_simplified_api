import {execSync} from 'child_process';
import {returnApp} from './src/app'
import "dotenv"

export interface IMyCustomOptions {
   reqDefaultOptions: {
      headers: any,
      hostname: string,
      port: number,
      baseURL: string,
   },
   graphqlPath: string,
}
let myCustomOptions = {
   reqDefaultOptions: {
      hostname: process.env.SERVER_HOST ? process.env.SERVER_HOST : "localhost",
      port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
      baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      headers: {
         "Content-Type": "application/json",
      }
   },
   graphqlPath: '/graphql',
} as IMyCustomOptions

const port = process.env.SERVER_PORT

export default async function setupServerToIntegrationTests() {
   execSync('yarn prisma migrate reset -f')

   let serverToBeClosedAfter: any
   const app = await returnApp()

   await new Promise(resolve => {
      serverToBeClosedAfter = app.listen(port, () => {
         // styling log
         const message = `Server is running on http://localhost:${port}`
         const styleTab = '-'.repeat(message.length +2)
         const color = `\x1b[36m`
         console.log(color,'\n' + `${styleTab}\n${styleTab}\n`,)
         console.log(`\x1b[37m`, message)
         console.log(color,`\n${styleTab}\n${styleTab}`)
         // styling log
         resolve('done')
      }).on('error', (err) => {
         console.error(err)
         process.exit(1)
      })
   })

   Object.assign(globalThis, {
      __testServer__: serverToBeClosedAfter,
      __myCustomOptions__: myCustomOptions,
   })
};