import { Result } from "../3_domain/Result";
import { BaseHandler } from "./BaseHandler";

// Finds the winner
class FindWinner extends BaseHandler{

     public handle(request:any,response:any):any{
         const result:Result = super.getGame().evaluate();
         super.getGame().setGameResult(result);
         super.getNext().handle(request, response);
     }

}export {FindWinner}