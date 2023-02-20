import {execSync} from 'child_process';
import {returnApp} from './src/app'
import "dotenv"
import { container } from 'tsyringe';

const port = process.env.SERVER_PORT

export default async function setupServerToIntegrationTests() {
   if(process.env.DB) {
      execSync('yarn prisma migrate reset -f')

      let serverToBeClosedAfter: any
      const app = await returnApp()

      await new Promise(resolve => {
         serverToBeClosedAfter = app.listen(port, () => {
            // styling log
            const message = `GlobalSetupFile: Server is running on http://localhost:${port}`
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
         }).on('close', () => {
            container.reset()
         })
      })

      Object.assign(globalThis, {
         _testServer_: serverToBeClosedAfter,
      })
   }
};