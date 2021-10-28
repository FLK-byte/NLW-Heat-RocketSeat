import styles from "./styles.module.scss"
import { VscGithubInverted} from "react-icons/vsc"
import { useContext, useEffect } from "react"
import { api } from "../../services/api"
import { AuthContext } from "../../contexts/auth"



export function LoginBox(){
    const {signinUrl, user} = useContext(AuthContext)
    console.log(user)

    
    return(<div className={styles.loginBoxWrapper}>
        <strong>Entre com a sua conta do github</strong>
        <a href={signinUrl} className={styles.signInWithGithub}><VscGithubInverted size="24"/> Entrar com GitHub</a>
    </div>)
}