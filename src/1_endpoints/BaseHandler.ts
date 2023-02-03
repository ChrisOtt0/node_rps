import { Game } from "../3_domain/Game";
import { Handler } from "./Handler"

abstract class BaseHandler implements Handler{
   private next:Handler;
   private static game=new Game();

   getGame():Game{
    return BaseHandler.game;
   }

   getNext():Handler{
     return this.next;
   }

   setNext(h:Handler):void{
      this.next = h;
   }

   abstract handle(request:any,response:any):Promise<any>;



} export {BaseHandler}