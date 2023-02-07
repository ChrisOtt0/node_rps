import { CheckAuth } from "./CheckAuth";
import { FindWinner } from "./FindWinner";
import { GetClientNumber } from "./GetClientNumber";
import { PickRandomHand } from "./PickRandomHand";
import { SetGameResult } from "./SetGameResult";

class GameEndpoint{

    public static play(request:any, response:any):any{
        // handler # 0
        const checkAuth: CheckAuth = new CheckAuth();

        // handler # 1
        const getClientNumber:GetClientNumber = new GetClientNumber();

        // handler # 2
        const pickRandomHand:PickRandomHand = new PickRandomHand();

        // handler # 3
        const findWinner:FindWinner = new FindWinner();

        // handler # 4
        const setGameResult:SetGameResult = new SetGameResult();

        // Defining the chain of actions:
        // handler #0 -> #2
        checkAuth.setNext(getClientNumber);
        // handler #1 -> #2
        getClientNumber.setNext(pickRandomHand);
        // handler #2 -> #3
        pickRandomHand.setNext(findWinner);
        // handler #3 -> #4
        findWinner.setNext(setGameResult);

        // starting the handler #1 action
        checkAuth.handle(request,response);

    }
 }

 export {GameEndpoint}