import http from "http";
import {Server as WebSocketServer} from "socket.io";
import app from "../../app";
import {CallerSocketManager} from "./caller/callerSocketManager";


const server = http.createServer(app);
const io = new WebSocketServer(server);

CallerSocketManager.create(io);

export {server};