import { Logger } from "./Logger";

class GameLogger extends Logger {
    constructor() {
        super('output/games');
    }
}

export {GameLogger}