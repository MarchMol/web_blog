import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { md5 } from 'js-md5'
import './Login.css'
import Input from '@components/Input.jsx'
import Button from '@components/Button.jsx'
import Loading from '@components/Loading.jsx'
import UseToken from '@hooks/UseToken.jsx'
import useApi from '@hooks/useApi.jsx'


function Login({ onSignal }) {
    const [formState, setFormState] = useState({ username: '', password: '' })
    const { setToken } = UseToken();
    const { loading, fetchData, error } = useApi()

    const handleSubmit = async () => {
        const body = {}
        body.username = formState.username
        body.password = md5(formState.password)
        try {
            const rslt = await fetchData('login', 'https://web-blog-inky.vercel.app/login', body)
            if (rslt) {
                setToken(rslt.access_token)
                onSignal(true)
            } else  {
                alert('Invalid username or password')
            }
        } catch {
            alert('There was an error logging in')
        }
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
                <form>
                    <Input label='Username' type='text' value={formState.username}
                        onChange={(value) => setValue('username', value)} size='normalInput' max={255} />
                    <Input label='Password' type='password' value={formState.password}
                        onChange={(value) => setValue('password', value)} size='normalInput' max={255} />
                    <Button text="Login" onClick={handleSubmit} />
                </form>
            </div>
        </Loading>
    )
}

export default Login