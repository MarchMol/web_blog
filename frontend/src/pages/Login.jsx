import { PropTypes } from 'prop-types'
import { md5 } from 'js-md5'
import { object, string } from 'yup'
import './Login.css'
import Input from '@components/Input.jsx'
import Button from '@components/Button.jsx'
import Loading from '@components/Loading.jsx'
import useToken from '@hooks/useToken.jsx'
import useApi from '@hooks/useApi.jsx'
import useMsg from '@hooks/useMsg'
import useForm from '@hooks/useForm'
import React from 'react'

const loginSchema = object({
  username: string().max(255).required(),
  password: string().max(255).required()
})

function Login ({ onSignal }) {
  const { values, setValue } = useForm(loginSchema)
  const { setToken } = useToken()
  const { loading, fetchData } = useApi()
  const { setIsModalOpen, setMsg, setIsChoice } = useMsg()

  const handleSubmit = async () => {
    const body = {}
    body.username = values.username
    body.password = md5(values.password)
    const rslt = await fetchData('login', 'https://web-blog-inky.vercel.app/login', body,null)
    if (rslt) {
      setToken(rslt.access_token)
      onSignal(true)
    } else {
      await setIsModalOpen(true)
      setMsg('Invalid username or password')
      setIsChoice(false)
    }
  }

  return (
        <Loading isLoading={loading}>
                <div className="container">
                    <h1>Login</h1>
                    <form>
                        <Input label='Username' type='text' value={values.username}
                            onChange={(value) => setValue('username', value)} size='normalInput' max={255} />
                        <Input label='Password' type='password' value={values.password}
                            onChange={(value) => setValue('password', value)} size='normalInput' max={255} />
                        <Button text="Login" onClick={handleSubmit} />
                    </form>
                </div>
        </Loading>
  )
}

Login.propTypes = {
  onSignal: PropTypes.func.isRequired
}

export default Login
