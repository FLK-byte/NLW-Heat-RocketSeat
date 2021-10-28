import  prismaClient  from "../prisma";
import {io} from "../app"


export class createMessageService {
    async execute(text : string, user_id: string){
        const message = await prismaClient.message.create({
            data:{
                text,
                user_Id : user_id
            },
            include:{
                user : true
            }
        })

        const infoWs = {
            text : message.text,
            id : message.user_Id,
            createdAt : message.createdAt,
            user :{
                name: message.user.name,
                avatar_url : message.user.avatar_url
            }
         }

        io.emit("new_message", infoWs)

        return message
    }
}