import { Result } from "../3_domain/Result";
import { Hand } from "../3_domain/Hand";
import { DisplayStrategy } from "./DisplayStrategy";
import { GameLogger } from "./GameLogger";

class TxtStrategy implements DisplayStrategy {
   private logger: GameLogger = new GameLogger();

    display(clientHand: Hand, computerHand: Hand, gameResult: Result, playerID: string): string {
      const date = new Date().toDateString().replace('/', '-');
      let log: string = "Client: ";
        let line:string ="";
      if (clientHand===Hand.Paper){
         log += "Paper";
         line = line + "Du valgte papir, ";
      } else if (clientHand===Hand.Rock){
         log += "Rock";
         line = line + "Du valgte sten, ";
      } else{
         log += "Scissor";
         line = line + "Du valgte saks, ";
      }
      log += "\nComputer: ";

      if (computerHand===Hand.Paper){
         log += "Paper";
         line = line + "computeren valgte papir.";
      } else if (computerHand===Hand.Rock){
         log += "Rock";
         line = line + "computeren valgte sten.";
      } else{
         log += "Scissor";
         line = line + "computeren valgte saks.";
      }
      log += "\nResult: ";

      if (gameResult===Result.Draw){
         log += "Draw";
         line = line +  " I valgte det samme, spil igen!";
      }
      else if (gameResult===Result.Won){
         log += "Win";
         line = line + " Du vandt spillet!";
      } else {
         log += "Loss";
         line = line + " Du tabte spillet!";
      }

      this.logger.log(playerID, log, date);

      return line;
    }
}

export {TxtStrategy}