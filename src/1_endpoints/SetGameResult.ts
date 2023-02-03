import { Result } from "../3_domain/Result";
import { BaseHandler } from "./BaseHandler";

// Returns the result of the game
class SetGameResult extends BaseHandler{

     public handle(request:any,response:any):any{
         console.debug("SetGameResult handler...");
         const value:Result = super.getGame().getGameResult();
         response.status(200).send(super.getGame().displayResultInHTML(value));
     }

}export {SetGameResult}