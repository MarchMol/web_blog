import { useState, useEffect } from 'react'
import Post from '../components/Post.jsx'
import Loading from '../components/Loading.jsx';
import './Home.css'

const temData = {
id: 1,
name: 'Dummy',
album: 'Chris Black Changed My Life',
artist: 'Portugal. The Man',
music: 'https://www.youtube.com/watch?v=8xT0vWporWs',
cover_art: 'https://i.scdn.co/image/ab67616d0000b273a9c3cd9374b929b927e982c2',
content: '"Dummy" de Portugal The Man es una canción envolvente que combina ritmos vibrantes con letras introspectivas y trágicas.',
rank: 4.8,
release_date: '2023-06-12'
}

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // hook para el cargado de la imagen
    const [error, setError] = useState(null);
    useEffect(() => {
        const getPosts = async () => {
          try {
            const response = await fetch('https://web-blog-inky.vercel.app/posts')
            const jsonPosts = await response.json();
            // Espera artificial para que se aprecie la animación de loading
            setPosts(jsonPosts);

            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        getPosts();
      }, []);


  return (
        
          <Loading isLoading={loading}>
            <div className='postsContainer'>
            {posts.map((item, index) => ( // map iterator for all the posts recieved from the api
            <Post jsonData={item} key={index}/>
            ))}
            </div>
          </Loading>
        
        
  )
}


export default Home
