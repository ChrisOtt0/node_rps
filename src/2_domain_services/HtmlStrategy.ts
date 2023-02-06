import { Result } from "../3_domain/Result";
import { Hand } from "../3_domain/Hand";
import { DisplayStrategy } from "./DisplayStrategy";

class HtmlStrategy implements DisplayStrategy {
    display(clientHand: Hand, computerHand: Hand, gameResult: Result): string {
        let line: string = "<html><body><h1>Client: ";
      if (clientHand === Hand.Paper) {
         line += "Paper";
      } else if (clientHand === Hand.Rock) {
         line += "Rock";
      } else {
         line += "Scissors";
      }
      line += "<br/>";

      line += "Computer: ";
      if (computerHand === Hand.Paper) {
         line += "Paper";
      } else if (computerHand === Hand.Rock) {
         line += "Rock";
      } else {
         line += "Scissors";
      }
      line += "<br/>";

      if (gameResult === Result.Draw) {
         line += "It's a draw, play again!";
      } else if (gameResult === Result.Won) {
         line += "Client won!";
      } else {
         line += "Client lost!";
      }

      line += "</h1></body></html>";
      return line;
    }
}

export {HtmlStrategy}