import { Request, Response } from "express";
import { GetLastMessagesService } from "../services/GetLastMessagesService";


export class GetLastMessagesController {
    async handle(req : Request, res : Response){
     try{  
        const service = new GetLastMessagesService();

        const result = await service.execute()

        return res.json(result)
        
     }catch(err){
        console.log("Erro no AuthenticateUserController, segue o erro filhao -> :" + err)
     }
    }
}