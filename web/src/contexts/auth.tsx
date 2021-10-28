import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";



type AuthProvider={
    children: ReactNode,
}

type authResponse = {
    token: string,
    user : {
        id: string,
        avatar_url: string,
        name: string,
        login: string
    }
}

type User={
    id:string,
    name:string,
    login:string,
    avatar_url:string
}

type AuthContextData={
    user: User | null,
    signinUrl : string,
    signOut: () => void
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props : AuthProvider ){
    const [globalUser, setUser] = useState<User | null>(null)
    const signinUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=9a6e0b18bb152e5ae893`

     async function signIn(code : string){
        const response = await api.post<authResponse>("authentication", {
            code : code
        })
        const {token, user} = response.data

        localStorage.setItem("@dowhile:token", token)

        api.defaults.headers.common.authorization = `Bearer ${token}`
        
        setUser(user)

        console.log(user)
        console.log(globalUser)

    }

    function signOut(){
        setUser(null)
        localStorage.removeItem(`@dowhile:token`)
    }

    useEffect(()=>{
        const url = window.location.href

        const codeGithub = url.includes("?code=")
        if(codeGithub){
            const code = url.split("?code=")
            window.history.pushState({},"",code[0])
            signIn(code[1])
        }

    },[])

    useEffect(()=>{
        const token = localStorage.getItem(`@dowhile:token`)
        api.defaults.headers.common.authorization = `Bearer ${token}`
        if(token){
            api.get<User>(`profile`).then(res=>{
                setUser(res.data)
            })
        }
    }, [])
    return (
    <AuthContext.Provider value={{user : globalUser ,signinUrl, signOut}}>
        {props.children}
    </AuthContext.Provider>)
}