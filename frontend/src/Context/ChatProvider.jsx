// import { useEffect } from "react"
// import { createContext ,useContext,useState} from "react"
// import { useHistory } from "react-router-dom"
// const ChatContext = createContext()
// const ChatProvider = ({children}) => {
//     const [user, setUser] = useState()
//     const history = useHistory()
//     useEffect(() => {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"))
//         setUser(userInfo)
//         if(!userInfo) {
//             history.push('/')
//         }
//     }, [history])
//     return (
//         <ChatContext.Provider value={{user,setUser}}>
//             {children}
//         </ChatContext.Provider>
//     )
// }
// //use usecontext hook for state to be accessed by other parts of app
// export const ChatState = () => {
//     return useContext(ChatContext)
// }
// export default ChatProvider

import { useEffect } from "react"
import { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([]) //to populate chats
    const [notifications, setNotifications] = useState([])
    const [notification, setNotification] = useState([])
    
    const history = useHistory()
    
    useEffect(() => {
        // Clear all state first
        setUser(null);
        setSelectedChat(null);
        setNotification([]);
        setChats(null);
        
        // Small delay to ensure state is cleared
        setTimeout(() => {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo && userInfo !== "undefined" && userInfo !== "null") {
                try {
                    const parsedUser = JSON.parse(userInfo);
                    if (parsedUser && parsedUser.token) {
                        setUser(parsedUser);
                    }
                } catch (error) {
                    console.log("Invalid user data, clearing localStorage");
                    localStorage.removeItem("userInfo");
                }
            }
        }, 100);
    }, [history])
    
    return (
        <ChatContext.Provider 
            value={{
                user,
                setUser,
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                notifications,
                setNotifications,
                notification,
                setNotification
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider