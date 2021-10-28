import styles from "./styles.module.scss"
import logoImg from "../../assets/logo.svg"
import {api} from "../../services/api"
import { useEffect, useState } from 'react'
import io from "socket.io-client"

type Message = {
    id:string,
    text: string,
    user:{
        name:string,
        avatar_url: string
    }
}

const messagesQueue: Message[] = []
var socket = io("http://localhost:1337")

socket.on("new_message", newMessage =>{
    messagesQueue.push(newMessage)
    console.log("socket io url do user: "+newMessage.user.avatar_url , newMessage.user.name, newMessage.user.id, newMessage.text)
})

export function MessageList(){
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(()=>{
        const timer = setInterval(()=>{
            if(messagesQueue.length > 0){
                setMessages(prevState=>[
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean))

                messagesQueue.shift()
            }
        },3000)    
    },[])


    useEffect(()=>{   
        api.get<Message[]>("/messages/lastmessages").then(res=>{
            setMessages(res.data)
            console.log("Get nas ultimas 3 menssagens: ")
            console.log(res.data)
        })
           
    },[])


    return(<div className={styles.messageListWrapper}>
        <img src={logoImg} alt="Logo Do DoWhile"></img>

        <ul className={styles.messageList}>
            {messages.map(message=>{
                return (
                <li key={message.id} className={styles.message}>
                    <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt="Avatar do usuario"></img>
                            </div>
                             <span>{message.user.name}</span>
                        </div>
                </li>);
            })}
        </ul>
    </div>)
}