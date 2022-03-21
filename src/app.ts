import express, {Application} from 'express';
import bodyParser from "body-parser";
import "reflect-metadata";
import {callerRouter} from "./infrastructure/router/caller/caller.router";
import {riderRouter} from "./infrastructure/router/rider/rider.router";

const app: Application = express();
const PORT = 5000;
const cors = require('cors')

//settings
app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

//routers
app.use(callerRouter);
app.use(riderRouter);

export default app;