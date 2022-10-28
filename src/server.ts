require('dotenv').config();
import { returnApp } from "./app";

const port = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000

const host = process.env.SERVER_HOST ? process.env.SERVER_HOST : '0.0.0.0' 

const serverInit = async () => {
   const app = await returnApp()
   app.listen(port, host, () => {
      console.log(`Server started on ${host}:${port}`)
   })
}

serverInit()