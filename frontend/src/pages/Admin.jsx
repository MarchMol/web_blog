import { useState, useEffect } from "react";
import Loading from "../components/Loading"
import '../components/Post.css'
import Icon from "../components/Icon";
import PostForm from "../components/PostForm";
import './Admin.css'


const routes = {
  '/update': {
    component: PostForm,
    type: 'update'
  },
  '/create': {
    component: PostForm,
    type: 'create'
  },
  '/delete': {
    component: PostForm,
  },
  '/view': {
    // component: Admin,
    requireAuth: true
  },
  '/manager': {
    // component: Admin,
    requireAuth: true
  },
}


function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // hook para el cargado de la imagen
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState('/manager')
  const [isHub, setHub] = useState(true);

  let CurrentPage = () => <h1>404</h1>

    if (localStorage.getItem('access_token')){
      CurrentPage = routes[page].component
    }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('https://web-blog-inky.vercel.app/posts')
        const jsonPosts = await response.json();
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

    {!loading &&
      (isHub ?
          (
            <div className="table">
              <div className="row">
                <h2>ID</h2>
                <h2>Song</h2>
                <h2>Actions</h2>
                <div />
              </div>
              {posts.map((item, index) => ( // map iterator for all the posts recieved from the api
                <div className="row" key={index}>
                  <h2 className="ident"> {item.id}</h2>
                  <h2 className="title"> {item.name}</h2>
                  <div className="icons">
                    <Icon type="editIcon"
                      onClick={() => {
                        setPage('/update')
                        setHub(false)
                        setSelected(item.id)
                      }}
                      enabled={true} />
                    <Icon type="deleteIcon"
                      onClick={() => {
                        setPage('/delete')
                        setHub(false)
                        setSelected(item.id)
                      }}
                      enabled={true} />
                  </div>
                </div>
              ))}

              <div className="bottomTable">
                <Icon type="addIcon" enabled={true} />
              </div>
            </div>

          ) :
            (
              <CurrentPage type={selected}/>
            )
      )
    }


    </Loading>
    
  )
}


export default Admin
