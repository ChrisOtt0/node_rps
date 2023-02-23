import { Result } from "../3_domain/Result";
import { Hand } from "../3_domain/Hand";
import { DisplayStrategy } from "./DisplayStrategy";
import { GameLogger } from "./GameLogger";

class HtmlStrategy implements DisplayStrategy {
   private logger: GameLogger = new GameLogger();

    display(clientHand: Hand, computerHand: Hand, gameResult: Result, playerID: string): string {
      const date: string = new Date().toDateString().replace('/', '-');
      let log: string = 'Client: '
        let line: string = "<html><body><h1>Client: ";
      if (clientHand === Hand.Paper) {
         log += "Paper";
         line += "Paper";
      } else if (clientHand === Hand.Rock) {
         log += "Rock";
         line += "Rock";
      } else {
         log += "Scissors";
         line += "Scissors";
      }
      log += "\n";
      line += "<br/>";

      log += "Computer: "
      line += "Computer: ";
      if (computerHand === Hand.Paper) {
         log += "Paper";
         line += "Paper";
      } else if (computerHand === Hand.Rock) {
         log += "Rock";
         line += "Rock";
      } else {
         log += "Scissors";
         line += "Scissors";
      }
      log += "\n";
      line += "<br/>";

      log += "Result: ";
      if (gameResult === Result.Draw) {
         log += "Draw";
         line += "It's a draw, play again!";
      } else if (gameResult === Result.Won) {
         log += "Win";
         line += "Client won!";
      } else {
         log += "Lose";
         line += "Client lost!";
      }

      line += "</h1></body></html>";

      this.logger.log(playerID, log, date);
      return line;
    }
}

export {HtmlStrategy}