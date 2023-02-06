import { Result } from "../3_domain/Result";
import { Hand } from "../3_domain/Hand";
import { DisplayStrategy } from "./DisplayStrategy";

class TxtStrategy implements DisplayStrategy {
    display(clientHand: Hand, computerHand: Hand, gameResult: Result): string {
        let line:string ="";
      if (clientHand===Hand.Paper){
         line = line + "Du valgte papir, ";
      } else if (clientHand===Hand.Rock){
         line = line + "Du valgte sten, ";
      } else{
         line = line + "Du valgte saks, ";
      }

      if (computerHand===Hand.Paper){
         line = line + "computeren valgte papir.";
      } else if (computerHand===Hand.Rock){
         line = line + "computeren valgte sten.";
      } else{
         line = line + "computeren valgte saks.";
      }

      if (gameResult===Result.Draw){
         line = line +  " I valgte det samme, spil igen!";
      }
      else if (gameResult===Result.Won){
         line = line + " Du vandt spillet!";
      } else {
         line = line + " Du tabte spillet!";
      }

      return line;
    }
}

export {TxtStrategy}