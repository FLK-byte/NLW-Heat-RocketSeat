import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";


export class ProfileUserController {
    async handle(req : Request, res : Response){
     try{  
         const {user_id} = req
        const service = new ProfileUserService();

        const result = await service.execute(user_id)

        return res.json(result)
        
     }catch(err){
        console.log("Erro no AuthenticateUserController, segue o erro filhao -> :" + err)
     }
    }
}