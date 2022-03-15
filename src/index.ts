import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000


app.post('/', (req, res) => {
   const hello = 'Hello World!'

   res.send(hello)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
