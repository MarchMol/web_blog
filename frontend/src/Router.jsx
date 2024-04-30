import {useState} from 'react'
import PropTypes from 'prop-types'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import './Router.css'

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
}

const Router = ({token, setToken}) => {
    const [page, setPage] = useState('/home')

    let CurrentPage = () => <h1>404</h1>

    if(routes[page].requireAuth && !token){
        return <h1>Acceso no Autorizado</h1>
    }

    CurrentPage = routes[page].component

    return(
        <div className='nav'>
        <ul className='navUl'>
            <li className='navLi'>
                <a href='#/home' onClick = {() =>
                setPage('/home')}>Home</a>
            </li>
            <li className='navLi'>
                <a href="#/login" onClick = {() =>
                setPage('/login')}>Login</a>
            </li>
            <li className='navLi'>
                <a href="#/admin" onClick = {() =>
                setPage('/admin')}>Admin</a>
            </li>
        </ul>
        <div className='page'>
        <CurrentPage setToken={setToken}/>
        </div>
        
        </div>
    )
}

Router.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
}

export default Router