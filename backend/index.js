import express from 'express'
import { getAllPosts, authUser, createPost } from './src/db.js';
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

// default, no path endpoint
app.get('/', (req, res) => {
  res.send('noice noice')
})

// Get posts endpoint
app.get('/posts', async (req,res)=> {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})


// Login Endpoint
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
    // if(validateToken(token)){
      const posts = await createPost(name, album, artist, music, cover_art, content, rank, album_date)
      res.status(200)
      res.json({ error: authHeader})
      return 
 
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error creando los posts' })
  }
})

// Listener
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
