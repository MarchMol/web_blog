import { useState, useEffect, useContext, createContext } from "react"

const TokenContext = createContext({token: '', UseToken: () => {}, isLoggedIn: false, isTokenExpired: ()=>{}})

const TokenProvider = ({children}) => {
    
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    )
    useEffect(() => {
        localStorage.setItem('access_token', token)
    }, [token])
    const isLoggedIn = !!token

    const isTokenExpired = (token) => {
        const decodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    };
    
    return(
        <TokenContext.Provider value={{token, setToken, isLoggedIn, isTokenExpired}}>
            {children}
        </TokenContext.Provider>
    )
}

const UseToken = () => {

    return useContext(TokenContext)
}

export default UseToken
export {TokenContext, TokenProvider}