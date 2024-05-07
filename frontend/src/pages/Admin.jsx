import { useState, useEffect } from "react";
import Loading from "../components/Loading"
import '../components/Post.css'
import Icon from "../components/Icon";
import PostForm from "../components/PostForm";
import './Admin.css'
import useApi from "../hooks/useApi";
import UseToken from "../hooks/UseToken";


const routes = {
  '/update': {
    component: PostForm,
    type: 'update'
  },
  '/create': {
    component: PostForm,
    type: 'create'
  },
  '/manager': {
    requireAuth: true
  },
}

function Admin() {
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({})
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState('/manager')
  const [isHub, setHub] = useState(true);
  const { token, isLoggedIn } = UseToken();
  const { setLoading, loading, fetchData, error } = useApi()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rslt = await fetchData('get','https://web-blog-inky.vercel.app/posts') || []
        if (rslt) {
          setPosts(rslt)
        } else if (error) {
          alert('There was an error fetching the posts')
        }
      } catch {
        alert('There was an error fetching the posts')
      }
    };
    getPosts();
  }, [isHub]);

  const handleDelete = async (id, song) => {
    if (confirm(`Are you sure you want to delete the following post? \n${id}: ${song}`)) {
        const rslt = await fetchData('delete', `https://web-blog-inky.vercel.app/delete/${id}`,{}, token)
        console.log(rslt)
        if (rslt) {
          setHub(false)
          alert('Post deleted succesfully')
          setHub(true)
        } else {
          alert('There was an error deleting the posts')
        }
    } 
  }

  let CurrentPage = () => <h1>404</h1>

  if (isLoggedIn) {
    CurrentPage = routes[page].component
  }

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
                        setInfo(item)
                      }}
                      enabled={true} />
                    <Icon type="deleteIcon"
                      onClick={() => {
                        handleDelete(item.id, item.name)
                      }}
                      enabled={true} />
                  </div>
                </div>
              ))}

              <div className="bottomTable">
                <Icon type="addIcon" enabled={true}
                  onClick={() => {
                    setPage('/create')
                    setHub(false)
                    setSelected(1)
                  }}
                />
              </div>
            </div>
          ) :
          (
            <CurrentPage id={selected} currentInfo={info} type={routes[page].type} setHub={setHub} setLoading={setLoading} />
          )
        )
      }
    </Loading>
  )
}

export default Admin
