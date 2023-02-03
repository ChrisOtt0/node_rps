import { BaseHandler } from "./BaseHandler";

// Sets the computerHand
class PickRandomHand extends BaseHandler{

     public handle(request:any,response:any):any{
        console.debug("PickRandomHand handler...");
        super.getGame().setFairRandomComputerHand();
        console.debug("The generated computerhand = " + super.getGame().getComputerHand());
        super.getNext().handle(request, response);
     }
} export {PickRandomHand}