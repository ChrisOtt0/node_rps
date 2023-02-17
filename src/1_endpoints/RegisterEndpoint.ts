import { Player } from "../3_domain/Player";
import { Session } from "./Session";
import bcrypt from 'bcrypt';
import {createClient} from 'redis';

class RegisterEndpoint {
    public static async registerAsync(request: any, response: any) {
        try {
            // clear cookies
            if (request.cookies) {
                request.cookies.tokenKey = null;
            }

            // fetch the request parameter (userID + password) in the body - send by postman
            const player: Player = request.body;

            // encrypt the password
            const salt = parseInt(process.env.SALT, 10);
            const hashedPsw: any = await bcrypt.hash(player.password, salt);

            // insert the player playerID and the hashed password in the Regis DB
            const redisClient = createClient();
            await redisClient.connect();

            const value = await redisClient.get(player.playerID);
            if (value != null) {
                return response.status(400).json("User with ID already exists.");
            }

            await redisClient.set(player.playerID, hashedPsw);
            await redisClient.disconnect();

            // setup cookie
            const thisToken: string = Session.generateToken(player.playerID);
            response.cookie('tokenKey', thisToken);

            // return status
            return response.status(201).json("Welcome to RPS.");
        }
        catch (e) {
            console.error(e);
            return response.status(500).json("An error occurred serverside.");
        }
    }

    public static async isPlayerNameAvailableAsync(request: any, response: any) {
        // If the parameter (playerID) is not
        // in the set of existing players in the Regis DB then proceed with the registration
        // else ask the user to find another ID
        const playerID = request.params.uid;
        if (playerID === null) {
            return response.status(400).json("Error: No playerID given.");
        }

        const redisClient = createClient();
        await redisClient.connect();
        const value = await redisClient.get(playerID);

        if (value === null) {
            return response.status(200).json("PlayerID is available.");
        }

        return response.status(400).json("PlayerID is taken.");
    }
}

export {RegisterEndpoint}