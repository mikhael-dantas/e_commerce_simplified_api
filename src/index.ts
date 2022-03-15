const express = require('express');
// import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
   const hello = 'Hello World!'
   res.send(hello)
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})