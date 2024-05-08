import { React, useState, useEffect, useContext, createContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'

const TokenContext = createContext({ useToken: () => {}, checkLogin: () => {} })

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || null
  )
  useEffect(() => {
    localStorage.setItem('access_token', token)
  }, [token])

  const checkLogin = () => {
    try {
      const decodedToken = jwtDecode(token.toString())
      const currentTime = Date.now() / 1000
      if (decodedToken.exp > currentTime) {
        return true
      } else {
        return 'expired'
      }
    } catch {
      return false
    }
  }

  return (
        <TokenContext.Provider value={{ token, setToken, checkLogin }}>
            {children}
        </TokenContext.Provider>
  )
}

const useToken = () => {
  return useContext(TokenContext)
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default useToken
export { TokenContext, TokenProvider }
