import express from 'express'
import { getAllPosts, createPost, authUser } from './src/db.js';
import cors from 'cors'

import { body, validationResult } from 'express-validator'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT

app.get('/', cors(), (req, res) => {
  res.send('noice noice')
})

app.get('/posts', cors(), async (req,res)=> {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})

app.post('/posts/', cors(), [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
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

app.post('/login', cors(), [
  body('username').notEmpty().isString(),
  body('password').notEmpty().isString(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }
  const {
    username, password,
  } = req.body

  try {
    const posts = await authUser(username, password)
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error alterando los posts' })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
