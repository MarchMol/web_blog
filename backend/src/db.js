import conn from './conn.js'

export async function getAllPosts() {

    let client;
    try {
        client = await conn.connect();
        const result = await client.query('SELECT * FROM your_table');

        console.log(result.rows);
        return rows
    } catch (error) {
        // Handle any errors
        console.error('Error executing query', error);

    } finally {
        // Release the client back to the pool
        if (client) {
            client.release();
        }
    }
}

export async function createPost(title, content, image_url) {
    const [result] = await conn.query(`INSERT INTO movie_blog (title,content,publish_date,image_url) VALUES ('${title}', '${content}', CURRENT_DATE, '${image_url}')`)
    return result
}