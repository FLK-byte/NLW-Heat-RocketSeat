import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthentication } from "./middleWare/ensureAuthentication";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";

export const router = Router();

router.post("/authentication", new AuthenticateUserController().handle)

router.post("/messages" ,ensureAuthentication, new CreateMessageController().handle)

router.get("/messages/lastmessages", new GetLastMessagesController().handle)

router.get("/profile",ensureAuthentication, new ProfileUserController().handle)
