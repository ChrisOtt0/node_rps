import { Player } from "../3_domain/Player";
import { Session } from "./Session";
import bcrypt from 'bcrypt';
import {createClient} from 'redis';

class LoginEndpoint {
    // public static evaluateSync(request: any, response: any) {
    //     try {
    //         // action 0 remove previous tokens
    //         if (request.cookies) {
    //             request.cookies.tokenKey=null;
    //         }

    //         // action 1
    //         const userName: string = request.params.uid;

    //         // action 2
    //         let accepted: boolean = false;
    //         if (userName === process.env.USER1 || userName === process.env.USER2) {
    //             accepted = true;
    //         } else {
    //             return response.status(403).json("Error: User not authorized.");
    //         }

    //         // action 3, 4, 5
    //         if (accepted) {
    //             const thisToken: string = Session.generateToken(userName);
    //             console.debug(Session.getUserName(thisToken));
    //             response.cookie('tokenKey', thisToken);
    //         }

    //         return response.status(200).json("You are logged in.");
    //     }
    //     catch (e) {
    //         console.error(e);
    //         return response.status(500).json("An error occurred serverside.");
    //     }
    // }

    public static async evaluateAsync(request: any, response: any) {
        try {
            // clear cookies
            if (request.cookies) {
                request.cookies.tokenKey = null;
            }

            // fetch the request parameter (userID + password) in the body - send by postman
            const player: Player = request.body;

            // verify the player identity
            // a) is the playerID in the set of all players, else return no ID
            const redisClient = createClient();
            await redisClient.connect();
            const hashedPsw = await redisClient.get(player.playerID);
            if (hashedPsw === null) {
                return response.status(400).json("No such user.");
            }

            // b) lookup in the map to get the hashed password from the DB
            const isCorrect: boolean = await bcrypt.compare(player.password, hashedPsw);

            // if the user is accepted return a JWT token in a cookie
            // else return not authorized
            if (!isCorrect) {
                return response.status(401).json("Incorrect password.");
            }

            const thisToken: string = Session.generateToken(player.playerID);
            response.cookie('tokenKey', thisToken);

            return response.status(200).json("Successfully logged in to RPS.");
        }
        catch (e) {
            console.error(e);
            return response.status(500).json("An error occurred serverside.");
        }
    }
}

export {LoginEndpoint}