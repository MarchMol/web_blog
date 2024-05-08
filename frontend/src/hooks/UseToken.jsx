import { useState, useEffect, useContext, createContext } from "react"
import { jwtDecode } from "jwt-decode"

const TokenContext = createContext({UseToken: () => {}, checkLogin: ()=>{}})

const TokenProvider = ({children}) => {
    
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    )
    useEffect(() => {
        localStorage.setItem('access_token', token)
    }, [token])

    
    const checkLogin = () => {
        try{
            const decodedToken = jwtDecode(token.toString());
            const currentTime = Date.now() / 1000;
            if(decodedToken.exp > currentTime){
                console.log('Valid token')
                console.log(decodedToken.exp)
                return true
            } else{
                    console.log('Expired token')
                return 'expired'
            }
        } catch{
            console.log('NUll token')
            return false
            
        }

    }


    return(
        <TokenContext.Provider value={{token, setToken, checkLogin}}>
            {children}
        </TokenContext.Provider>
    )
}

const UseToken = () => {

    return useContext(TokenContext)
}

export default UseToken
export {TokenContext, TokenProvider}