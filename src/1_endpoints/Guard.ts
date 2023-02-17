import { Session } from "./Session";

const MAXNUMBEROFPLAYS: number = 5;

class Guard {
    public static hasSession(request: any): boolean {
        const token: string = request.cookies.tokenKey;
        if (token) {
            return true;
        }
        return false;
    }

    public static canContinue(request: any): boolean {
        const token: string = request.cookies.tokenKey;
        // TODO
        return false;
    }
}

export {Guard}