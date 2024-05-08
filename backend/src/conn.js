import pg from 'pg'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
})

pool.connect((err) => {
  if (err) throw err
  console.log('Se conecto a postgres')
})

export default pool
