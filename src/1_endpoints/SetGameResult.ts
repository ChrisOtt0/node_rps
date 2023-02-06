import { HtmlStrategy } from "../2_domain_services/HtmlStrategy";
import { TxtStrategy } from "../2_domain_services/TxtStrategy";
import { DisplayStrategy } from "../2_domain_services/DisplayStrategy";
import { Hand } from "../3_domain/Hand";
import { Result } from "../3_domain/Result";
import { BaseHandler } from "./BaseHandler";

// Returns the result of the game
class SetGameResult extends BaseHandler{

    public handle(request:any,response:any):any{
        console.debug("SetGameResult handler...");
        const clientHand:Hand = super.getGame().getClientHand();
        const computerHand:Hand = super.getGame().getComputerHand();
        const gameResult:Result = super.getGame().getGameResult();
        let ds: DisplayStrategy = new TxtStrategy();

        if (process.env.STRING_STRATEGY === "1") {
           ds = new HtmlStrategy();
        }

        response.status(200).send(ds.display(clientHand, computerHand, gameResult));
    }

}export {SetGameResult}