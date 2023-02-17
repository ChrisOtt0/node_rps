import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {createClient} from 'redis';
import { GameEndpoint } from '../1_endpoints/GameEndpoint';
import { LoginEndpoint } from '../1_endpoints/LoginEndpoint';
import { RegisterEndpoint } from '../1_endpoints/RegisterEndpoint';
dotenv.config({ path: 'config/middleware.env' });
const routes = express();
routes.use(cors());
routes.use(bodyParser.json());
routes.use(express.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });

// registration endpoint
routes.post('/register', async (req, res) => {
    return await RegisterEndpoint.registerAsync(req, res);
});

// check new playerID endpoint
routes.get('/isPlayerNameAvailable/:uid', async (req, res) => {
    return await RegisterEndpoint.isPlayerNameAvailableAsync(req, res);
});

// login endpoint
routes.post('/login', async (req, res) => {
    const reqBody = req.body;
    if (Object.keys(reqBody).length === 0) {
        return res.status(400).json("No ID and password given.");
    } else {
        return await LoginEndpoint.evaluateAsync(req, res);
    }
});

// The (so far) single route to the game...
routes.get('/play/:uid',  (req,res) => {
    return GameEndpoint.play(req,res);
});

// // demo of using redis database
// routes.get('/test', async (req, res) => {
//     const client = createClient();
//     await client.connect();
//     const value = await client.get('test');
//     console.debug(value);
//     await client.disconnect();
//     return res.status(200).json(value);
// });

// The default (all other not valid routes)
routes.get('*', (req,res) =>{
     return res.status(404).send('no such route');
});

export {routes}

