import conn from './conn.js'

export async function getAllPosts() {
    let client;
    try {
        client = await conn.connect();
        const result = await client.query('SELECT * FROM movie_blog');

        console.log(result.rows);
        return result.rows
    } catch (error) {
        console.error('Error seleccionando registros', error);

    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function createPost(title, content, image_url) {

    let client;
    try {
        client = await conn.connect();
        const result = await conn.query(`INSERT INTO movie_blog (title,content,publish_date,image_url) VALUES ('${title}', '${content}', CURRENT_DATE, '${image_url}')`)

        console.log(result);
        return result
    } catch (error) {
        console.error('Error insertando registros', error);

    } finally {
        if (client) {
            client.release();
        }
    }
}