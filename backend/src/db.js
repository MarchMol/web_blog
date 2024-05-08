import conn from './conn.js'

// Get Posts, no auth
export async function getAllPosts () {
  let client
  try {
    client = await conn.connect()
    const result = await client.query('SELECT * FROM music_blog ORDER BY id')

    console.log(result.rows)
    return result.rows
  } catch (error) {
    console.error('Error seleccionando registros', error)
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Login, no auth
export async function authUser (username, password) {
  let client
  try {
    client = await conn.connect()
    const result = await conn.query(`SELECT * FROM auth_credentials('${username}','${password}')`)

    console.log(result.rows[0])
    return result.rows[0]
  } catch (error) {
    console.error('Error autenticando usuario', error)
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Create, auth
export async function createPost (name, album, artist, music, coverArt, content, rank, albumDate) {
  let client
  try {
    client = await conn.connect()
    const result = await conn.query(
            `INSERT INTO music_blog(name, album, artist, music, cover_art, content, rank, album_date, post_date) 
             VALUES ('${name}','${album}','${artist}','${music}','${coverArt}','${content}',${rank},'${albumDate}', CURRENT_TIMESTAMP);`
    )
    return result.rowCount[0]
  } catch (error) {
    console.error('Error creando post', error)
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Update, auth
export async function updatePost (id, name, album, artist, music, coverArt, content, rank, albumDate) {
  let client
  try {
    client = await conn.connect()
    const result = await conn.query(
            `UPDATE music_blog
            SET 
                name = '${name}',
                album = '${album}',
                artist = '${artist}',
                music = '${music}',
                cover_art = '${coverArt}',
                content = '${content}',
                rank = ${rank},
                album_date = '${albumDate}',
                post_date = CURRENT_TIMESTAMP
            WHERE 
                id = ${id};`)
    return result.rowCount[0]
  } catch (error) {
    console.error('Error creando post', error)
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Delete, auth
export async function deletePost (id) {
  let client
  try {
    client = await conn.connect()
    const result = await conn.query(
            `DELETE FROM music_blog WHERE id=${id}`
    )
    return result.rowCount[0]
  } catch (error) {
    console.error('Error eliminando post', error)
  } finally {
    if (client) {
      client.release()
    }
  }
}
