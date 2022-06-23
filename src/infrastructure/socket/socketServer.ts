import http from "http";
import {Server as WebSocketServer} from "socket.io";
import app from "../../app";
import {SocketManager} from "./socketManager";


const server = http.createServer(app);
const io = new WebSocketServer(server);

SocketManager.create(io);

export {server};