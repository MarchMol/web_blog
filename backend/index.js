import express from 'express'
import pool from './src/conn.js'

const app = express()
const port = 22398

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})