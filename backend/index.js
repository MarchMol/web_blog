import express from 'express'
import pool from './src/conn.js'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();


const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})