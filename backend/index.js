import express from 'express'
import pool from './src/conn.js'
import { getAllPosts } from './src/db.js';

import { body, validationResult } from 'express-validator'

import { createRequire } from 'module';
import { get } from 'http';
const require = createRequire(import.meta.url);
require('dotenv').config();


const app = express()
app.use(express.json())

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('noice noice')
})

app.get('/posts', async (req,res)=> {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

app.post('/posts/', [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isURL(),
  body('image_url').notEmpty().isURL(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }

  const {
    title, content, image_url,
  } = req.body

  try {
    const posts = await createPost(title, content, image_url)
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error alterando los posts' })
  }
})