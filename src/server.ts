require('dotenv').config();
import { returnApp } from "./app";

const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

const serverInit = async () => {
   const app = await returnApp()
   app.listen(port, () => {
      console.log(`Server started on port ${port}`)
   })
}

serverInit()