import { port, serverHttp } from "./app";

serverHttp.listen(port, ()=>console.log("O server esta rodando na porta: " + port ))