import { Logger } from "./Logger";

class ErrorLogger extends Logger {
    constructor() {
        super('output/errors');
    }
}

export {ErrorLogger}