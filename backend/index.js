import express from 'express'
import { getAllPosts, authUser, createPost, updatePost, deletePost } from './src/db.js';
import cors from 'cors'
import { generateToken, validateToken } from './jwt.js';
import { body, validationResult } from 'express-validator'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express()
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions));
app.use(express.json())

const port = process.env.PORT

// default, no path endpoint, on auth
app.get('/', (req, res) => {
  res.send('noice noice')
})

// Get posts endpoint, no auth
app.get('/posts', async (req,res)=> {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})


// Login Endpoint, no auth
app.post('/login/', [
  body('username').notEmpty(),
  body('password').notEmpty(),
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
    const success = await posts.auth_credentials
    if(success){
      const user = {username}
      const token = generateToken(user)
      res.status(200)
      res.json({"success": true, access_token: token})
      return 
    }
    else{
      res.status(401).json({ "success": false })
      return 
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error alterando los posts' })
  }
})

// create endpoint, auth
app.post('/create/', [
  body('name').notEmpty().isString(),
  body('album').notEmpty().isString(),
  body('artist').notEmpty().isString(),
  body('music').notEmpty().isURL(),
  body('cover_art').notEmpty().isURL(),
  body('content').notEmpty().isString(),
  body('rank').notEmpty().isNumeric(),
  body('album_date').notEmpty().isString(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }
  const {
    name, album, artist, music, cover_art, content, rank, album_date,
  } = req.body

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    try{
      validateToken(token)
      const posts = await createPost(name, album, artist, music, cover_art, content, rank, album_date)
      res.status(200)
      res.json(posts)
    } catch{
      return res.status(400).json({error: "Invalid or Expired Token"})
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error creando los posts' })
  }
})

//update endpoint, auth
app.post('/update/', [
  body('id').notEmpty(),
  body('name').notEmpty().isString(),
  body('album').notEmpty().isString(),
  body('artist').notEmpty().isString(),
  body('music').notEmpty().isURL(),
  body('cover_art').notEmpty().isURL(),
  body('content').notEmpty().isString(),
  body('rank').notEmpty().isNumeric(),
  body('album_date').notEmpty().isString(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }
  const {
    id, name, album, artist, music, cover_art, content, rank, album_date,
  } = req.body

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    try{
      validateToken(token)
      const posts = await updatePost(id, name, album, artist, music, cover_art, content, rank, album_date)
      res.status(200)
      res.json(posts)
    } catch{
      return res.status(400).json({error: "Invalid or Expired Token"})
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error updating los posts' })
  }
})

// Delete endpoint, auth
app.delete('/delete/', [
  body('id').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }
  const {
    id,
  } = req.body

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    try{
      validateToken(token)
      const posts = await deletePost(id)
      res.status(200)
      res.json(posts)
    } catch{
      return res.status(400).json({error: "Invalid or Expired Token"})
    }
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error updating los posts' })
  }
})

// Listener
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
