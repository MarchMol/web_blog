import './PostForm.css'
import { PropTypes } from 'prop-types'
import { useState, useEffect } from 'react'
import Input from './Input.jsx'
import Icon from './Icon'
import UseToken from '@hooks/UseToken.jsx'
import { object, string, number, date } from 'yup';
import useForm from '@hooks/useForm.jsx'
import useApi from '@hooks/useApi.jsx'

let postSchema = object({
    name: string().max(255).required(),
    artist: string().max(255).required(),
    album: string().max(255).required(),
    rank: number().max(5).positive().required(),
    music: string().url().required(),
    cover_art: string().url().required(),
    album_date: date().required(),
    content: string().required()
});

function PostForm({ type, id, currentInfo, setLoading, setHub }) {
    const { token } = UseToken();
    const { values, setValue, validate, errors } = useForm(postSchema)
    const [url, setUrl] = useState('')
    const [isOk, setOk] = useState(true)
    const { fetchData } = useApi()

    useEffect(() => {
        if (type === 'update') {
            setUrl('https://web-blog-inky.vercel.app/update')
            setValue('name', currentInfo.name)
            setValue('artist', currentInfo.artist)
            setValue('album', currentInfo.album)
            setValue('rank', currentInfo.rank)
            setValue('music', currentInfo.music)
            setValue('cover_art', currentInfo.cover_art)
            setValue('album_date', new Date(currentInfo.album_date).toISOString().split('T')[0])
            setValue('content', currentInfo.content)
        } else {
            setUrl('https://web-blog-inky.vercel.app/create')
        }
    }, []);

    const handleValidate = async () => {
        if (await validate()) {
            setOk(true)
            handleSave()
        } else {
            setOk(false)
            setLoading(false)
        }
        console.log('values', values)
    }

    const handleExit = async () => {
        if (confirm('Changes will not be saved \nDo you want to exit?')) {
            setHub(true)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        console.table(values)
        try {
            setOk(true)
            const body = {}
            if (type === 'update') {
                body.id = id
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
                alert('The changes have been saved')
            } else {
                alert('There was an error saving the post')
            }
            setLoading(false)
            setHub(true)

        } catch {
            alert('There was an error saving the post')
        }

    }

    const setValueForm = (name, value) => {
        setValue(name, value)
    };


    return (
        <div className='formContainer'>
            <div className='idContainer'>Post ID: {id}</div>

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
    )
}

PostForm.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    currentInfo: PropTypes.object,
    setHub: PropTypes.func,
    setLoading: PropTypes.func
}

export default PostForm