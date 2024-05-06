import { useState, useEffect, useContext, createContext } from "react"

const TokenContext = createContext({token: '', UseToken: () => {}, isLoggedIn: false})

const TokenProvider = ({children}) => {
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    )
    useEffect(() => {
        localStorage.setItem('access_token', token)
    }, [token])
    const isLoggedIn = !!token

    
    return(
        <TokenContext.Provider value={{token, setToken, isLoggedIn}}>
            {children}
        </TokenContext.Provider>
    )
}

const UseToken = () => {
    const {token, setToken, isLoggedIn} = useContext(TokenContext)
    
    return {token, setToken, isLoggedIn}
}

export default UseToken
export {TokenContext, TokenProvider}