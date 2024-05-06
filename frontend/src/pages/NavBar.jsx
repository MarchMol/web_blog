import useRouter from "@hooks/useRouter"
import UseToken from "@hooks/UseToken"
import Logo from "@components/Logo"

const NavBar = () => {
    const { page, navigate } = useRouter()
    const { setToken, isLoggedIn} = UseToken()

    const confirmLogOut = () =>{
        var logoutConfirmed = confirm("Are you sure you want to log out?");
        if(logoutConfirmed){
            setToken(null)
            navigate('/home')
        }
    }
    
    return (
        <div className='nav'>
            <Logo />
        <ul className='navUl'>
            <li className='navLi' id={page==='/home' ? 'selected' : 'unselected' }>
                <a href='#/home' onClick = {() =>
                navigate('/home')}>Home</a>
            </li>
            {isLoggedIn && (
                <>
                <li className='navLi' id={page==='/post' ? 'selected' : 'unselected' }>
                <a href='#/admin/post' onClick = {() =>
                navigate('/post')}>Post Manager</a>
                </li>

                <li className='navLi' id={page==='/logout' ? 'selected' : 'unselected' }>
                <a href='#/admin/logout' onClick = {() =>
                confirmLogOut()}>Log Out</a>
                </li>
                </>
            )}

            {!isLoggedIn &&(
            <li className='navLi' id={page==='/login' ? 'selected' : 'unselected' }>
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