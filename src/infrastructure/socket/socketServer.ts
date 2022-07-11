import http from "http";
import {Server as WebSocketServer} from "socket.io";
import app from "../../app";
import {SocketManager} from "./socketManager";


const server = http.createServer(app);
//const io = new WebSocketServer(server);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        allowHeaders: ['auth-token', 'user-type'],
        credentials: true
    }
})

SocketManager.create(io);

export {server};