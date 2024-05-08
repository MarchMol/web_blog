import { useState, useEffect } from 'react'
import Post from '@components/Post.jsx'
import Loading from '@components/Loading.jsx';
import './Home.css'
import useApi from '@hooks/useApi.jsx';
import useMsg from '@hooks/useMsg';
import Message from '@components/Message';

function Home() {
  const [posts, setPosts] = useState([]);
  const { loading, fetchData, error } = useApi()
  const { setIsActive, setMsg, setIsChoice } = useMsg()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rslt = await fetchData('get', 'https://web-blog-inky.vercel.app/posts') || false
        if (rslt) {
          setPosts(rslt)
        } else if (error) {
          setIsModalOpen(true)
          setMsg('There was an error fetching the posts')
          setIsChoice(false)
        }
      } catch {
        setIsModalOpen(true)
        setMsg('There was an error fetching the posts')
        setIsChoice(false)
      }
    };
    getPosts();
  }, []);


  return (
    <Loading isLoading={loading}>
        <div className='postsContainer'>
          {posts.map((item, index) => ( // map iterator for all the posts recieved from the api
            <Post jsonData={item} key={index} />
          ))}
        </div>
    </Loading>
  )
}


export default Home
