import {useState} from 'react'
import PropTypes from 'prop-types'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import './Router.css'
import Logo from './components/Logo.jsx'

const routes = {
    '/home': {
        component: Home,
        requireAuth: false
    },
    '/login': {
        component: Login,
        requireAuth: false
    },
    '/admin': {
        component: Admin,
        requireAuth: true
    },
    '/logout':{
        component: Admin,
        requireAuth: true
    },
    '/post':{
        component: Admin,
        requireAuth: true
    }
}

const Router = ({token, setToken}) => {
    const [page, setPage] = useState('/home')
    const [login, setLogin] = useState(false)
    
    const confirmLogOut = () =>{
        var logoutConfirmed = confirm("Are you sure you want to log out?");
        if(logoutConfirmed){
            setToken(null)
            setPage('/home')
        }

    }


    const handleLogin = (data) => {
        if(data){
            setPage('/home')
        } // Update state or perform any action based on the signal
    };

    let CurrentPage = () => <h1>404</h1>

    if(routes[page].requireAuth && !token){
        return <h1>Acceso no Autorizado</h1>
    }

    CurrentPage = routes[page].component

    return(
        <>
        <div className='nav'>
            <Logo />
        <ul className='navUl'>
            <li className='navLi' id={page==='/home' ? 'selected' : 'unselected' }>
                <a href='#/home' onClick = {() =>
                setPage('/home')}>Home</a>
            </li>
            {token && (
                <>
                <li className='navLi' id={page==='/post' ? 'selected' : 'unselected' }>
                <a href='#/post' onClick = {() =>
                setPage('/post')}>Post</a>
                </li>

                <li className='navLi' id={page==='/logout' ? 'selected' : 'unselected' }>
                <a href='#/logout' onClick = {() =>
                confirmLogOut()}>Log Out</a>
                </li>
                </>
            )}

            {!token &&(
            <li className='navLi' id={page==='/login' ? 'selected' : 'unselected' }>
            <a href="#/login" onClick = {() =>
            setPage('/login')}>Login</a>
            </li>
            )
            }


        </ul>
        </div>
        <div className='page'>
        <CurrentPage setToken={setToken} onSignal={handleLogin}/>
        </div>
        </>
    )
}

Router.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
}

export default Router