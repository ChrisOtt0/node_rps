import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {createClient} from 'redis';
import { GameEndpoint } from '../1_endpoints/GameEndpoint';
import { LoginEndpoint } from '../1_endpoints/LoginEndpoint';
import { Player } from '../3_domain/Player';
dotenv.config({ path: 'config/middleware.env' });
const routes = express();
routes.use(cors());
routes.use(bodyParser.json());
routes.use(express.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });

// registration endpoint
routes.post('/register', async (req, res) => {
    // fetch the request parameter (userID + password) in the body - send by postman
    const player: Player = req.body;

    // encrypt the password
    const salt = 17;
    const hashedPsw: any = await bcrypt.hash(player.password, salt);

    console.debug("The hashed password is: " + hashedPsw);

    // insert the player playerID and the hashed password in the Regis DB
    // TODO!!!!

    // return status
    return res.status(201).json(player);
});

// check new playerID endpoint
routes.get('/isPlayerNameAvailable/:uid', async (req, res) => {
    // If the parameter (playerID) is not
    // in the set of existing players in the Regis DB then proceed with the registration
    // else ask the user to find another ID
});

// login endpoint
routes.post('/login', async (req, res) => {
    try {
        // fetch the request parameter (userID + password) in the body - send by postman
        const player: Player = req.body;

        // verify the player identity
        // a) is the playerID in the set of all players, else return no ID
        // b) lookup in the map to get the hashed password from the DB

        const hashedPassword: string = "";

        const isCorrect: boolean = await bcrypt.compare(player.password, hashedPassword);
        console.debug((isCorrect) ? 'equal' : 'not equal');

        // if the user is accepted return a JWT token in a cookie
        // else return not authorized
    }
    catch (e) {
        console.error("post: " + e);
    }
});

// The (so far) single route to the game...
routes.get('/play/:uid',  (req,res) => {
    return GameEndpoint.play(req,res);
});

// The default (all other not valid routes)
routes.get('*', (req,res) =>{
     return res.status(404).send('no such route');
});

export {routes}

