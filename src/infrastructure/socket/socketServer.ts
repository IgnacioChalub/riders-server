import http from "http";
import {Server as WebSocketServer} from "socket.io";
import app from "../../app";
import {SocketConnection} from "./caller/socketConnection";


const server = http.createServer(app);
const io = new WebSocketServer(server);

SocketConnection.create(io);

export {server};