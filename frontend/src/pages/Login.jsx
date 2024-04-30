import { useContext, useState } from 'react'
import {PropTypes} from 'prop-types'
import {md5} from 'js-md5'
import './Login.css'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'


function Login ({setToken}) {
const [formState, setFormState] = useState({username: '', password: ''})
 

    const handleSubmit = async () => {
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
        }
    }


    const setValue = (name, value) => {
        setFormState({
          ...formState,
          [name]: value
        });
      };


    return (
    <>
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
    </>
)}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
}

export default Login