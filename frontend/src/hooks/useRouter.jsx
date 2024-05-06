import { useState, useContext, createContext } from "react"

const RouterContext = createContext({page: '/home', navigate: () => {}})
const RouterProvider = ({children}) =>{
    const [page, setPage] = useState('/home')

    const navigate = (destiny) =>{
        setPage(destiny)
    }

    return(
        <RouterContext.Provider value={{page, navigate}}>
            {children}
        </RouterContext.Provider>
    )
}

const useRouter = () => {
    const {page, navigate} = useContext(RouterContext)
    
    return {page, navigate}
}

export default useRouter
export {RouterProvider}