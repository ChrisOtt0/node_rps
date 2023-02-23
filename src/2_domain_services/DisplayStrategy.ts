import { Hand } from "../3_domain/Hand";
import { Result } from "../3_domain/Result";

interface DisplayStrategy {
    display(clientHand: Hand, computerHand: Hand, gameResult: Result, playerID: string): string;
}

export {DisplayStrategy}