import { Request, Response } from "express";
import { AtuthenticateUserService } from "../services/AuthenticateUserService";


export class AuthenticateUserController {
    async handle(req : Request, res : Response){
     try{
        const {code} = req.body;
       
        const service = new AtuthenticateUserService();
        const result = await service.execute(code)

        return res.json(result)
     }catch(err){
        console.log("Erro no AuthenticateUserController, segue o erro filhao -> :" + err)
     }
    }
}