import { ErrorLogger } from "../2_domain_services/ErrorLogger";
import { BaseHandler } from "./BaseHandler";
import { Session } from "./Session";

// Reads the choise of the client
class GetClientNumber extends BaseHandler{
    private logger: ErrorLogger = new ErrorLogger();

    // assignment: There is a minor bug in the code if you try to  play/ggjhgg!! can this be fixed?
    public handle(request:any, response:any):any{
        const clientNumber:number = parseInt(request.params.uid, 10);
        const playerID = Session.getUserName(request.cookies.tokenKey);

        if (isNaN(clientNumber)) {
            const date = new Date().toDateString().replace('/', '-');
            this.logger.log(playerID, 'User entered a :uid that could not be converted to an integer. :uid given: ' + request.params.uid, date);
            response.status(404).json("Error: The value must be an integer.");
        }
        if (clientNumber < 0 || clientNumber > 2) {
            const date = new Date().toDateString().replace('/', '-');
            this.logger.log(playerID, 'User entered a :uid in an invalid range. :uid given: ' + request.params.uid, date);
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