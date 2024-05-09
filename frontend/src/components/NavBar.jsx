import useRouter from '@hooks/useRouter'
import useToken from '@hooks/useToken'
import Logo from '@components/Logo'
import './NavBar.css'
import useMsg from '@hooks/useMsg'
import { React, useEffect } from 'react'

const NavBar = () => {
  const { page, navigate } = useRouter()
  const { setToken, checkLogin } = useToken()
  const { setIsModalOpen, setMsg, setIsChoice, logout, setLogout, exit, setExit } = useMsg()

  const confirmLogOut = () => {
    setIsChoice(true)
    setMsg('Are you sure you want to log out?')
    setIsModalOpen(true)
    setLogout(true)
  }

  useEffect(() => {
    if (checkLogin() === 'expired') {
      setIsChoice(false)
      setMsg('Session expired')
      setIsModalOpen(true)
      navigate('/home')
      setToken(null)
    }
  }, [])

  useEffect(() => {
    if (checkLogin() === 'expired') {
      setIsChoice(false)
      setMsg('Session expired')
      setIsModalOpen(true)
      setToken(null)
      navigate('/home')
    }
  }, [checkLogin()])

  useEffect(() => {
    if (logout) {
      if (exit === 1) {
        setIsModalOpen(false)
        setExit(0)
        setToken(null)
        navigate('/home')
        setLogout(false)
      } else if (exit === 2) {
        setIsModalOpen(false)
        setExit(0)
      }
    }
  }, [exit])

  return (
    <div className='nav'>
      <Logo />
        <ul className='navUl'>
          <li className='navLi' id={page === '/home' ? 'selected' : 'unselected' }>
            <a href='#/home' onClick = {() => {
              navigate('/home')
              checkLogin()
            }}>Home</a>
          </li>
            {(checkLogin()) && (
                <>
                <li className='navLi' id={page === '/admin' ? 'selected' : 'unselected' }>
                <a href='#/admin' onClick = {() => {
                  navigate('/admin')
                  checkLogin()
                }}>Post Manager</a>
                </li>

                <li className='navLi' id={page === '/logout' ? 'selected' : 'unselected' }>
                <a href='#/admin/logout' onClick = {() =>
                  confirmLogOut()}>Log Out</a>
                </li>
                </>
            )}

            {(!checkLogin()) && (
            <li className='navLi' id={page === '/login' ? 'selected' : 'unselected' }>
            <a href="#/login" onClick = {() =>
              navigate('/login')}>Login</a>
            </li>
            )
            }
        </ul>
        </div>
  )
}

export default NavBar
