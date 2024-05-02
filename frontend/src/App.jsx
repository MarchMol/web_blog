import {useEffect, useState} from "react";
import Router from "./Router";



function App() {
    const [ token, setToken] = useState(
        localStorage.getItem('access_token') || null
    )
    
    useEffect(() => {
        localStorage.setItem('access_token', token)
    }, [token])
    return (
        <div>
            <Router token={token} setToken={setToken} />
        </div> 
    )
}

export default App