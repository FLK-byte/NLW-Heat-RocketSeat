import { FormEvent, useContext, useState } from "react"
import { VscGithubInverted, VscSignOut } from "react-icons/vsc"
import { AuthContext } from "../../contexts/auth"
import { api } from "../../services/api"
import styles from "./styles.module.scss"


export function SendMessageForm (){
    const [message, setMessage] = useState('')
    const {user, signOut} = useContext(AuthContext)
    console.log(user)
    async function handlesendMessage(e : FormEvent){
        e.preventDefault()
        if(!message.trim()){
            return
        }
        else{
            api.post("messages", { message })
            setMessage("")
        }
    } 


    return(
        <div className={styles.sendMessageFormWrapper}>
            <button className={styles.signOutButton}>
                <VscSignOut size={32} onClick={signOut}/>
            </button>
            <header className={styles.userInformation}>
                <div className={styles.userInformation}>
                    <div className={styles.userImage}> 
                        <img src={user?.avatar_url}  alt=""></img>
                    </div>
                    <strong className={styles.userName}>{user?.name}</strong>
                    <span className={styles.userGithub}>
                        <VscGithubInverted size={16}/>
                        {user?.login}
                    </span>
                </div>
            </header>

            <form onSubmit={handlesendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea 
                name="message" 
                id="message" 
                placeholder="Qual a sua expectativa para o evento?"
                onChange={e=> setMessage(e.target.value)}
                value={message}
                />
                <button type="submit"> Enviar sua mensagem </button>
            </form>
        </div>
    )
}