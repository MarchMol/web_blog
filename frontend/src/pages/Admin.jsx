import { React, useState, useEffect } from 'react'
import Loading from '@components/Loading'
import '@components/Post.css'
import Icon from '@components/Icon'
import './Admin.css'
import useApi from '@hooks/useApi'
import useToken from '@hooks/useToken'
import useMsg from '@hooks/useMsg'
import useRouter from '@hooks/useRouter'

function Admin () {
  const [posts, setPosts] = useState([])
  const { token } = useToken()
  const { loading, fetchData, setLoading } = useApi()
  const { navigate, setAlterPost } = useRouter()
  const { setIsModalOpen, setMsg, setIsChoice, exit, setExit, selected, setSelected } = useMsg()

  useEffect(() => {
    const getPosts = async () => {
      const rslt = await fetchData('get', 'https://web-blog-inky.vercel.app/posts') || false
      if (rslt) {
        setLoading(false)
        setPosts(rslt)
        setLoading(false)
      } else {
        setIsModalOpen(true)
        setMsg('There was an error fetching the posts')
        setIsChoice(false)
      }
    }
    getPosts()
  }, [])

  useEffect(() => {
    const deleteMsg = async () => {
      if (exit === 1) {
        const rslt = await fetchData('delete', `https://web-blog-inky.vercel.app/delete/${selected}`, {}, token)
        if (rslt) {
          setExit(0)
          setIsChoice(false)
          setMsg('Deleted Successfully')
        } else {
          setExit(0)
          setIsChoice(false)
          setMsg('Something went wrong')
        }
      } else if (exit === 2) {
        setIsModalOpen(false)
        setExit(0)
      }
    }
    deleteMsg()
  }, [selected, exit])

  const handleDelete = async (id, song) => {
    setSelected(id)
    setIsChoice(true)
    setMsg(`Are you sure you want to delete the following post? ${id}: ${song}`)
    setIsModalOpen(true)
  }

  return (
    <Loading isLoading={loading}>
      {!loading &&
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
                <h2 className="ident" key={index}>{item.id}</h2>
                <h2 className="title"key={index}>{item.name}</h2>
                <div className="icons">
                  <Icon type="editIcon"
                    onClick={() => {
                      setAlterPost({ id: item.id, action: 'update', currentInfo: item })
                      navigate('/update')
                    }}
                    enabled={true} />
                  <Icon type="deleteIcon"
                    onClick={() => {
                      setSelected(item.id)
                      handleDelete(item.id, item.name)
                    }}
                    enabled={true} />
                </div>
              </div>
            ))}

            <div className="bottomTable">
              <Icon type="addIcon" enabled={true}
                onClick={() => {
                  setAlterPost({ id: 1, action: 'create' })
                  navigate('/create')
                }}
              />
            </div>
          </div>
        )
      }
    </Loading>
  )
}

export default Admin
