import { useState, useContext, createContext } from "react"

const RouterContext = createContext({page: '/home', navigate: () => {}})
const RouterProvider = ({children}) =>{
    const [page, setPage] = useState('/home')
    const [alterPost, setAlterPost] = useState({id: 0, action: '', currentInfo: {}})
    const [isHub, setIsHub] = useState(false)
    const navigate = (destiny) =>{
        setPage(destiny)
    }

    return(
        <RouterContext.Provider value={{page, navigate, isHub, setIsHub, alterPost, setAlterPost}}>
            {children}
        </RouterContext.Provider>
    )
}

const useRouter = () => {
    return useContext(RouterContext)
}

export default useRouter
export {RouterProvider}