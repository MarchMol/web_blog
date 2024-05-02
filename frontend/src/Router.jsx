import {useEffect, useState} from 'react'
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
    
    useEffect(() => {
        if (token){
            document.body.style.background = 'rgb(105,229,215)';
            document.body.style.background = 'linear-gradient(140deg, rgba(105,229,215,1) 0%, rgba(89,164,125,1) 50%, rgba(63,70,111,1) 100%)';
            document.body.style.backgroundAttachment = 'fixed';
        } else{
            document.body.style.background = 'rgb(229,123,105)';
            document.body.style.background = 'linear-gradient(140deg, rgba(229,123,105,1) 0%, rgba(164,89,164,1) 50%, rgba(63,87,111,1) 100%)';
            document.body.style.backgroundAttachment = 'fixed';
        }
    }, [token])


    const confirmLogOut = () =>{
        var logoutConfirmed = confirm("Are you sure you want to log out?");
        if(logoutConfirmed){
            setToken('')
            setPage('/home')
        }
    }

    const handleLogin = (signal) => {
        if(signal){
            setPage('/home')
        }
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
                <a href='#/admin/post' onClick = {() =>
                setPage('/post')}>Post Manager</a>
                </li>

                <li className='navLi' id={page==='/logout' ? 'selected' : 'unselected' }>
                <a href='#/admin/logout' onClick = {() =>
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