import { useState } from 'react'
import {PropTypes} from 'prop-types'
import {md5} from 'js-md5'
import './Login.css'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import Loading from '../components/Loading.jsx'


function Login ({setToken, onSignal}) {
const [formState, setFormState] = useState({username: '', password: ''})
const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        const body = { }
        body.username = formState.username
        body.password = md5(formState.password)
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch('https://web-blog-inky.vercel.app/login',
        fetchOptions)
        const {access_token} = await response.json();
        if (response.ok){
            console.log('success!')
            setToken(access_token)
            onSignal(true)
        }
        setLoading(false)
    }


    const setValue = (name, value) => {
        setFormState({
          ...formState,
          [name]: value
        });
      };


    return (
    <Loading isLoading={loading}>
        <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <Input label='Username' type='text' value={formState.username}
            onChange={(value) => setValue('username',value)}/>
            <Input label='Password' type='password' value={formState.password}
            onChange={(value) => setValue('password',value)}/>
            <Button text="Login" onClick={handleSubmit}/>
        </form>
        </div>    
    </Loading>
    
)}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
}

export default Login