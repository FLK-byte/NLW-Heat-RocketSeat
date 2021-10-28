import axios from "axios";
import prismaClient from "../prisma/index"
import { sign } from "jsonwebtoken"
//Receber Codigo
//Recuperar Acess Token(informaçoes do usuario)
// Recupoerar infos do user no github
//Verificar se o usuario existe no DB
//----sim, Gera token
//----nao, registra e gera token
// retornar o token com as infos do usuario logado

interface IacessTokenResponse{
    access_token : string
}

interface IuserResponse{
    login : string,
    id : number,
    avatar_url : string,
    name : string
}

export class AtuthenticateUserService {
    async execute(code : string){
        const url = "https://github.com/login/oauth/access_token"
        try{
            const { data : accessTokenResponse } = await axios.post<IacessTokenResponse>(url,null,{
                params:{
                    client_id : process.env.GITHUB_CLIENT_ID,
                    client_secret : process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers:{
                    "Accept": "application/json"
                }
            })

            const response = await axios.get<IuserResponse>("https://api.github.com/user",{
                headers:{
                    authorization : `Bearer ${accessTokenResponse.access_token}`
                }
            })

            const {id, name, login, avatar_url} = response.data

            let user = await prismaClient.user.findFirst({
                where : {
                    github_id : id
                }
            })

            if (!user){
               user = await prismaClient.user.create({
                    data :{
                        github_id :id,
                        avatar_url,
                        name,
                        login
                    }
                })
            }

            const token = sign({
                user : {
                    name : user.name,
                    avatar_url : user.avatar_url,
                    id: user.id
                },
            },
            process.env.JWT_SECRET,
            {
                subject : user.id,
                expiresIn : "1d"
            }
            )
            return {token, user}
            
        }catch(err){
        console.log("Deu erro AuthenticateUserService segue o erro filhao -> :" + err)
    }
    

 }
}