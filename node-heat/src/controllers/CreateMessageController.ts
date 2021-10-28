import { Request, Response } from "express";
import { createMessageService } from "../services/CreateMessageService";


export class CreateMessageController {
    async handle(req : Request, res : Response){
     try{
        const {message} = req.body;
        const {user_id } = req

        const service = new createMessageService();

        const result = await service.execute(message, user_id);

        return res.json(result)
       

     }catch(err){
        console.log("Erro no CreateMessageController, segue o erro filhao -> :" + err)
     }
    }
}