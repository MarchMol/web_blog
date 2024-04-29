import conn from './conn.js'

export async function getAllPosts() {
    let client;
    try {
        client = await conn.connect();
        const result = await client.query('SELECT * FROM music_blog');

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


export async function authUser(username, password) {
    let client;
    try {
        client = await conn.connect();
        const result = await conn.query(`SELECT * FROM auth_credentials('${username}','${password}')`)

        console.log(result.rows[0]);
        return result.rows[0]
    } catch (error) {
        console.error('Error autenticando usuario', error);

    } finally {
        if (client) {
            client.release();
        }
    }
}