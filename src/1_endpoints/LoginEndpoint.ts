import { Session } from "./Session";

class LoginEndpoint {
    public static evaluate(request: any, response: any) {
        try {
            // action 0 remove previous tokens
            if (request.cookies) {
                request.cookies.TokenKey=null;
            }

            // action 1
            const userName: string = request.params.uid;

            // action 2
            let accepted: boolean = false;
            if (userName === process.env.USER1 || userName === process.env.USER2) {
                accepted = true;
            } else {
                return response.status(403).json("Error: User not authorized.");
            }

            // action 3, 4, 5
            if (accepted) {
                const thisToken: string = Session.generateToken(userName);
                console.debug(Session.getUserName(thisToken));
                response.cookie('tokenKey', thisToken);
            }

            return response.status(200).json("You are logged in.");
        }
        catch (e) {
            console.error(e);
        }
    }
}

export {LoginEndpoint}