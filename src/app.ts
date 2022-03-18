import express, {Application} from 'express';
import bodyParser from "body-parser";
import "reflect-metadata";
import {callerRouter} from "./infrastructure/router/caller.router";

const app: Application = express();
const PORT = 3000;
const cors = require('cors')

//settings
app.set('port', PORT);
app.use(bodyParser.json());
//app.use(cors);

//routers
app.use(callerRouter);

export default app;