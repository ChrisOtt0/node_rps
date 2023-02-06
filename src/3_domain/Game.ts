import { Hand } from "./Hand";
import { Result } from "./Result";

class Game{
   private clientHand:Hand;
   private computerHand:Hand;
   private gameResult:Result;

   public setFairRandomComputerHand():void{
    const MAXIMUMHANDVALUE:number = 2;
    const randomPick:number = Math.floor(Math.random() * (MAXIMUMHANDVALUE+1));
    if (randomPick === 1)
       this.computerHand = Hand.Rock;
    else if(randomPick===0)
       this.computerHand = Hand.Paper;
    else{
       this.computerHand = Hand.Scissors;
    }
   }

   public setClientHand(value:number):void{
      if (value === 1)
         this.clientHand = Hand.Rock;
      else if(value===0)
         this.clientHand = Hand.Paper;
      else{
        this.clientHand = Hand.Scissors;
      }
   }

   public setGameResult(result:Result){
      this.gameResult=result;
   }

   public getClientHand():Hand{
     return this.clientHand;
   }

   public getComputerHand():Hand{
    return this.computerHand;
   }

   public getGameResult():Result{
      return this.gameResult;
   }

   public evaluate():Result{

     if (this.clientHand===this.computerHand){
        return Result.Draw;
     } else if(this.clientHand===Hand.Paper && this.computerHand===Hand.Rock){
        return Result.Won;
     } else if(this.clientHand===Hand.Rock && this.computerHand===Hand.Scissors){
        return Result.Won;
     } else if(this.clientHand===Hand.Scissors && this.computerHand===Hand.Paper){
        return Result.Won;
     } else {
        return Result.Lost;
     }
   }

   // Assignment: break this long method code up
   public displayResultInOneLineInDanish(value:Result):string{
      let line:string ="";
      if (this.clientHand===Hand.Paper){
         line = line + "Du valgte papir, ";
      } else if (this.clientHand===Hand.Rock){
         line = line + "Du valgte sten, ";
      } else{
         line = line + "Du valgte saks, ";
      }

      if (this.computerHand===Hand.Paper){
         line = line + "computeren valgte papir.";
      } else if (this.computerHand===Hand.Rock){
         line = line + "computeren valgte sten.";
      } else{
         line = line + "computeren valgte saks.";
      }

      if (value===Result.Draw){
         line = line +  " I valgte det samme, spil igen!";
      }
      else if (value===Result.Won){
         line = line + " Du vandt spillet!";
      } else {
         line = line + " Du tabte spillet!";
      }

      return line;
   }

   public displayResultInHTML(value: Result): string {
      let line: string = "<html><body><h1>Client: ";
      if (this.clientHand === Hand.Paper) {
         line += "Paper";
      } else if (this.clientHand === Hand.Rock) {
         line += "Rock";
      } else {
         line += "Scissors";
      }
      line += "<br/>";

      line += "Computer: ";
      if (this.computerHand === Hand.Paper) {
         line += "Paper";
      } else if (this.computerHand === Hand.Rock) {
         line += "Rock";
      } else {
         line += "Scissors";
      }
      line += "<br/>";

      if (value === Result.Draw) {
         line += "It's a draw, play again!";
      } else if (value === Result.Won) {
         line += "Client won!";
      } else {
         line += "Client lost!";
      }

      line += "</h1></body></html>";
      return line;
   }

}export {Game}