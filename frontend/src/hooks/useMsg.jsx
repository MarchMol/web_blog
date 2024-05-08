

import { useState, useEffect, useContext, createContext } from "react"
import Message from "../components/Message";

const MsgContext = createContext({isModalOpen: false, msg: '', isChoice: false, response: false, exit:0, setExit:()=>{}, save:0, setSave:()=>{}})
const MsgProvider = ({children}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const [isChoice, setIsChoice] = useState(false)
    const [exit, setExit] = useState(0)
    const [expire, setExpire] = useState(false)
    const [logout, setLogout] = useState(false)
    const [ selected, setSelected ] = useState(0)

    return(
        <MsgContext.Provider value={{isModalOpen, setIsModalOpen, msg, setMsg, isChoice, setIsChoice, exit, setExit, logout, setLogout, selected, setSelected, expire, setExpire}}>
            <Message>
                {children}
            </Message>
        </MsgContext.Provider>
    )
}

const useMsg = () => {
    return  useContext(MsgContext)
}

export default useMsg
export {MsgProvider}