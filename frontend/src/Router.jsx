import {useEffect, useState, createContext, useContext} from 'react'

import useRouter from './hooks/useRouter.jsx'
import Login from '@pages/Login.jsx'
import Home from '@pages/Home.jsx'
import Admin from '@pages/Admin.jsx'
import './Router.css'
import UseToken from '@hooks/UseToken.jsx'
import NavBar from '@pages/NavBar.jsx'


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

const Router = () => {
    const { page, navigate } = useRouter();
    const { token, setToken, isLoggedIn } = UseToken();
    
    useEffect(() => {
        if (isLoggedIn){
            document.body.style.background = 'rgb(105,229,215)';
            document.body.style.background = 'linear-gradient(140deg, rgba(105,229,215,1) 0%, rgba(89,164,125,1) 50%, rgba(63,70,111,1) 100%)';
            document.body.style.backgroundAttachment = 'fixed';
        } else{
            document.body.style.background = 'rgb(229,123,105)';
            document.body.style.background = 'linear-gradient(140deg, rgba(229,123,105,1) 0%, rgba(164,89,164,1) 50%, rgba(63,87,111,1) 100%)';
            document.body.style.backgroundAttachment = 'fixed';
        }
    }, [token])


    const handleLogin = (signal) => {
        if(signal){
            navigate('/home')
        }
    };

    let CurrentPage = () => <h1>404</h1>

    console.log(routes[page]);
    if(routes[page].requireAuth && !token){
        return <h1>Acceso no Autorizado</h1>
    }

    CurrentPage = routes[page].component

    return(
        <>
        <NavBar/>
        <div className='page'>
        <CurrentPage onSignal={handleLogin}/>
        </div>
        </>
    )
}


export default Router