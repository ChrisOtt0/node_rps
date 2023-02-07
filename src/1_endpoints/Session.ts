import jwt from 'jsonwebtoken';

const expiresIn: string = '2h';
const MAXCOUNT: number = 10;

class Session {
    static generateToken(userName: string): string {
        const token = jwt.sign({'userName':userName}, process.env.TOKEN_SECRET, {expiresIn} )
        console.debug("The token generated (encrypted): " + token);
        return token;
    }

    static getUserName(token: string): any {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET);
        console.debug("decodedToken: " + decodedToken);
        return decodedToken.userName;
    }

    static updateCounter(token: string): string {
        return "TODO";
    }
}

export {Session}