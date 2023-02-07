import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { GameEndpoint } from '../1_endpoints/GameEndpoint';
import { LoginEndpoint } from '../1_endpoints/LoginEndpoint';
dotenv.config({ path: 'config/middleware.env' });
const routes = express();
routes.use(cors());
routes.use(bodyParser.json());
routes.use(express.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });

// login endpoint
routes.get('/login/:uid', (req, res) => {
    return LoginEndpoint.evaluate(req, res);
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

