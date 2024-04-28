import conn from './conn'

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM movie_blog')
    return rows
}

export async function createPost(title, content, image_url) {
    const [result] = await conn.query(`INSERT INTO blog_posts (title,content,publish_date,image_url) VALUES ('${title}', '${content}', CURRENT_DATE, '${image_url}')`)
    return result
  }