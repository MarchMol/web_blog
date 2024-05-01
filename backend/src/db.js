import conn from './conn.js'

// Get Posts, no auth
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

// Login, no auth
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

// Create, auth
export async function createPost(){
    let client;
    try{
        client = await conn.connect(song_name, album, artist, music, cover_art, content, rank, album_date);
        const result = await conn.addListener.query(
            `INSERT INTO music_blog(name, album, artist, music, cover_art, content, rank, album_date, post_date) 
             VALUES (${song_name},${album},${artist},${music},${cover_art},${content},${rank},${album_date}, CURRENT_TIMESTAMP);`
        )
        return result.rows[0]
    } catch{
        console.error('Error creando post', error);
    } finally{
        if(client){
            client.release();
        }
    }
}

// // Update, auth
// export async function updatePost(){
//     let client;
//     try{

//     } catch{

//     } finally{
//         if(client){
//             client.release();
//         }
//     }
// }


// // Delete, auth
// export async function deletePost(){
//     let client;
//     try{

//     } catch{

//     } finally{
//         if(client){
//             client.release();
//         }
//     }
// }
