import './PostForm.css'
import { PropTypes } from 'prop-types'
import { useState, useEffect } from 'react'
import Input from './Input.jsx'
import Icon from './Icon'
import UseToken from '@hooks/UseToken.jsx'
import { object, string, number, date, ValidationError } from 'yup';
import useForm from '@hooks/useForm.jsx'

let postSchema = object({
    name: string().max(255).required(),
    artist: string().max(255),
    album: string().max(255),
    rank: number().lessThan(5).positive(),
    music: string().url().required(),
    cover_art: string().url().required(),
    album_date: date(),
    content: string().required()
  });



function PostForm({ type, id, currentInfo, setLoading, setHub}) {
    const { token } = UseToken();
    const { values, setValue, validate, clear , errors} = useForm(postSchema)
    const [ url, setUrl] = useState('')
    const [ isOk, setOk ] = useState(false)
    const [formState, setFormState] = useState(
        {
            name: currentInfo.name,
            artist: currentInfo.artist,
            album: currentInfo.album,
            rank: currentInfo.rank,
            music: currentInfo.music,
            cover_art: currentInfo.cover_art,
            day: new Date(currentInfo.album_date).getDate().toString().padStart(2, '0'),
            month: (new Date(currentInfo.album_date).getMonth() + 1).toString().padStart(2, '0'),
            year: new Date(currentInfo.album_date).getFullYear(),
            content: currentInfo.content

        }
    )

    useEffect(() => {
        if(type==='create'){
            setUrl('https://web-blog-inky.vercel.app/create')
            setFormState({
                name: '',
                artist: '',
                album: '',
                rank: '',
                music: '',
                cover_art: '',
                day: '',
                month: '',
                year: '',
                content: ''
            })
            setValueForm('name', formState.name)
            setValueForm('artist', formState.artist)
            setValueForm('album', formState.album)
            setValueForm('rank', formState.rank)
            setValueForm('music', formState.music)
            setValueForm('cover_art', formState.cover_art)
            setValueForm('album_date', `${formState.year}-${formState.month}-${formState.day}`)
            setValueForm('content', formState.content)
        } else{
            setUrl('https://web-blog-inky.vercel.app/update')
        }


    }, []);


    const handleValidate = async () =>{
        if(await validate()){
            setOk(true)
        } else{
            setOk(false)
        }
        console.log('values',values)
    }

    const handleExit = async () => {
        if(confirm('Changes will not be saved \nDo you want to exit?')){
            setHub(true)
        }
    }


    const handleSave = async () => {
        setLoading(true)


        const body = {}
        if(type==='update'){
            body.id = id
        } 
        
        body.name = formState.name
        body.artist = formState.artist
        body.album = formState.album
        body.rank = formState.rank
        body.music = formState.music
        body.cover_art = formState.cover_art
        body.album_date = `${formState.year}-${formState.month}-${formState.day}`
        body.content = formState.content

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await fetch(url, fetchOptions)

        if (response.ok) {
            console.log('success!')
            alert('Success')
        } else {
            alert('No Success :(')
        }
        setLoading(false)
        setHub(true)
    }

    const setValueForm = (name, value) => {
        setFormState({
            ...formState,
            [name]: value
        });
        if(['year','month','day'].includes(name)){
            setValue('album_date', `${formState.year}-${formState.month}-${formState.day}`)
        } else{
            setValue(name, value)
        }
        
    };


    return (
        <div className='formContainer'>
            <div className='idContainer'>Post ID: {id}</div>

            <Input label='Song' value={formState.name} size="normalInput"
                onChange={(value) => setValueForm('name', value)}
            />
            <Input label='Artist' value={formState.artist} size="normalInput"
                onChange={(value) => setValueForm('artist', value)}
            />
            <Input label='Album' value={formState.album} size="normalInput"
                onChange={(value) => setValueForm('album', value)}
            />
            <Input label='Rank' value={formState.rank} size="normalInput"
                onChange={(value) => setValueForm('rank', value)}
            />
            <Input label='Music (URL)' value={formState.music} size="normalInput"
                onChange={(value) => setValueForm('music', value)}
            />
            <Input label='Cover Art (URL)' value={formState.cover_art} size="normalInput"
                onChange={(value) => setValueForm('cover_art', value)}
            />


            <div className='flexContainer'>
                <Input label='Year' value={formState.year} size="smallInput" 
                    onChange={(value) => setValueForm('year', value)} />
                <Input label='Month' size="smallInput" value={formState.month}
                    onChange={(value) => setValueForm('month', value)} />
                <Input label='Day' size="smallInput" value={formState.day}
                    onChange={(value) => setValueForm('day', value)} />
            </div>
            <Input label='Content' value={formState.content} size="bigInput"
                onChange={(value) => setValueForm('content', value)}
            />
            <div className='flexContainer'>
            <Icon type='saveIcon' enabled={true} onClick={handleSave} />
            <Icon type='cancelIcon' enabled={true} onClick={handleExit}  />
            <Icon type='checkIcon' enabled={true} onClick={handleValidate}/>
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