import { useContext } from "react"
import { LoginBox } from "./Components/LoginBox/LoginBox"
import { MessageList } from "./Components/MessageList/MessageList"
import { SendMessageForm } from "./Components/SendMessageForm/SendMessageForm"
import { AuthContext } from "./contexts/auth"
import styles from "./styles/App.module.scss"

export function App() {
  const { user } = useContext(AuthContext)
  return (
    <main className={styles.contentWrapper}>
      <MessageList/>
      { !!user ? <SendMessageForm/> : <LoginBox/>}
    </main>
  )
}

