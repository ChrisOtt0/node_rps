import { BaseHandler } from "./BaseHandler";

// Reads the choise of the client
class GetClientNumber extends BaseHandler{

    // assignment: There is a minor bug in the code if you try to  play/ggjhgg!! can this be fixed?
    public handle(request:any, response:any):any{
        console.debug("GetClientNumber handler...");
        const clientNumber:number = parseInt(request.params.uid, 10);
        if (isNaN(clientNumber)) {
            response.status(404).json("Error: The value must be an integer.");
        }
        if (clientNumber < 0 || clientNumber > 2) {
            response.status(404).json("Error: Choose a value from 0 to 2.");
        }

        super.getGame().setClientHand(clientNumber);
        super.getNext().handle(request, response);

        // try{
        //     clientNumber = parseInt(request.params.uid,10);  // radix = 10
        //     if (isNaN(clientNumber)) {
        //         response.status(404).json("Error, the value must be an integer");
        //     }
        // }catch(e){
        //     response.status(404).json("Error, the value must be an integer");
        // }
        // if (clientNumber <0 || clientNumber >2){
        //    response.status(404).json("Error, choose a value from 0 to 2");
        // } else{
        //    super.getGame().setClientHand(clientNumber);
        //    super.getNext().handle(request, response);
        // }
    }
}export {GetClientNumber}