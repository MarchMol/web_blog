import './PostForm.css'
import { PropTypes } from 'prop-types'
import { React, useState, useEffect } from 'react'
import Input from '@components/Input.jsx'
import Icon from '@components/Icon.jsx'
import useToken from '@hooks/useToken.jsx'
import { object, string, number, date } from 'yup'
import useForm from '@hooks/useForm.jsx'
import useApi from '@hooks/useApi.jsx'
import useMsg from '@hooks/useMsg.jsx'
import useRouter from '@hooks/useRouter.jsx'
import Loading from '@components/Loading.jsx'

const postSchema = object({
  name: string().max(255).required(),
  artist: string().max(255).required(),
  album: string().max(255).required(),
  rank: number().max(5).positive().required(),
  music: string().url().required(),
  cover_art: string().url().required(),
  album_date: date().required(),
  content: string().required()
})

function PostForm () {
  const { token } = useToken()
  const { values, setValue, validate, errors } = useForm(postSchema)
  const [url, setUrl] = useState('')
  const [isOk, setOk] = useState(true)
  const { fetchData, isLoading, setLoading } = useApi()
  const { alterPost, navigate } = useRouter()
  const { setIsModalOpen, setMsg, setIsChoice, exit, setExit } = useMsg()

  useEffect(() => {
    if (alterPost.action === 'update') {
      setUrl('https://web-blog-inky.vercel.app/update')
      setValue('name', alterPost.currentInfo.name)
      setValue('artist', alterPost.currentInfo.artist)
      setValue('album', alterPost.currentInfo.album)
      setValue('rank', alterPost.currentInfo.rank)
      setValue('music', alterPost.currentInfo.music)
      setValue('cover_art', alterPost.currentInfo.cover_art)
      setValue('album_date', new Date(alterPost.currentInfo.album_date).toISOString().split('T')[0])
      setValue('content', alterPost.currentInfo.content)
    } else {
      setUrl('https://web-blog-inky.vercel.app/create')
    }
  }, [])

  useEffect(() => {
    if (exit === 1) {
      setIsModalOpen(false)
      setExit(0)
      navigate('/admin')
    } else if (exit === 2) {
      setIsModalOpen(false)
      setExit(0)
    }
  }, [exit])

  const handleValidate = async () => {
    if (await validate()) {
      setOk(true)
      handleSave()
    } else {
      setOk(false)
      setLoading(false)
    }
  }

  const handleExit = () => {
    setIsChoice(true)
    setMsg('Changes will not be saved. Do you want to exit?')
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      setOk(true)
      const body = {}
      if (alterPost.action === 'update') {
        body.id = alterPost.id
      }
      body.name = values.name
      body.artist = values.artist
      body.album = values.album
      body.rank = values.rank
      body.music = values.music
      body.cover_art = values.cover_art
      body.album_date = values.album_date
      body.content = values.content
      const rslt = await fetchData('post', url, body, token)
      if (rslt) {
        setIsChoice(false)
        setMsg('The changes have been saved')
        setIsModalOpen(true)
      } else {
        setIsChoice(false)
        setMsg('There was an error saving the post idk')
        setIsModalOpen(true)
      }
      navigate('/admin')
    } catch {
      setIsChoice(false)
      setMsg('There was an error saving the post')
      setIsModalOpen(true)
    }
  }

  const setValueForm = (name, value) => {
    setValue(name, value)
  }

  return (
        <Loading isLoading={isLoading}>
        <div className='formContainer'>
            <div className='idContainer'>Post ID: {alterPost.id}</div>

            <Input label='Song' value={values.name} size="normalInput"
                onChange={(value) => setValueForm('name', value)} max={255}
            />
            <Input label='Artist' value={values.artist} size="normalInput"
                onChange={(value) => setValueForm('artist', value)} max={255}
            />
            <Input label='Album' value={values.album} size="normalInput"
                onChange={(value) => setValueForm('album', value)} max={255}
            />
            <Input label='Rank' value={values.rank} size="normalInput"
                onChange={(value) => setValueForm('rank', value)}
            />
            <Input label='Music (URL)' value={values.music} size="normalInput"
                onChange={(value) => setValueForm('music', value)}
            />
            <Input label='Cover Art (URL)' value={values.cover_art} size="normalInput"
                onChange={(value) => setValueForm('cover_art', value)}
            />

            <Input label='Release Date' value={values.album_date} size="smallInput"
                onChange={(value) => setValueForm('album_date', value)} type='date' />

            <Input label='Content' value={values.content} size="bigInput"
                onChange={(value) => setValueForm('content', value)}
            />
            <div className='flexContainer'>
                <Icon type='saveIcon' enabled={true} onClick={handleValidate} />
                <Icon type='cancelIcon' enabled={true} onClick={handleExit} />
            </div>
            {!isOk &&
                <p className='errorMssg'> {errors.generalError}</p>
            }

        </div>
        </Loading>
  )
}

PostForm.propTypes = {
  setLoading: PropTypes.func
}

export default PostForm
