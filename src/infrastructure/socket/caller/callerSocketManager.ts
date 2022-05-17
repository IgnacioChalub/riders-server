import {Server as WebSocketServer, Socket} from "socket.io";
import {tokenValidation} from "../../router/shared/tokenValidation";
import Call from "../../../domain/entities/call";
import CreateCallController from "../../controllers/caller/createCall.controller";
import validate from "../schemaValidator";
import callSchema from "./schemas/callSchema";
import {Ride} from "../../../domain/entities/ride";

class CallerSocketManager{

    static instance: CallerSocketManager;

    private io: WebSocketServer;
    private socketIds = new Map<any, string>();

    constructor(io: WebSocketServer) {
        this.io = io;
    }

    static create(io: WebSocketServer): void{
        this.instance = new CallerSocketManager(io);
        this.instance.createConnectionAndListeners(); 
    }

    static getInstance(): CallerSocketManager{
        return this.instance;
    }

    createConnectionAndListeners(): void {
        this.io.on('connection', (socket: Socket) => {
            const token: string = <string>socket.handshake.headers['auth-token'];
            this.createConnection(socket, token);
            this.createCallListener(socket);
        });
    }

    private createConnection(socket: Socket, token: string): void {
        try{
            const id: string = tokenValidation(token, "caller");
            this.socketIds.set(id, socket.id);
            socket.emit('connection', {connected: true});
        }catch (e: any) {
            socket.emit('connection', {error: e.message});
            socket.disconnect(true);
        }
    }

    private createCallListener(socket: Socket): void {
        socket.on('create-call', async (message: any) => {
            try{
                message = this.validateJson(message);
            }catch(e){
                socket.emit('create-call', {error: "invalid message"});
                return;
            }
            if(!await validate(callSchema, message)){
                socket.emit('create-call', {error: "invalid message"});
                return;
            }
            const token: string = <string>socket.handshake.headers['auth-token'];
            let id: string = "";
            try{
                id = tokenValidation(token, "caller");
            }catch(e: any){
                socket.emit('create-call', {error: e.message});
                socket.disconnect(true);
                return;
            }
            const socketId: string | undefined = this.socketIds.get(id);
            if (!socketId) {
                socket.emit('create-call', {error: "connection not found"});
                return;
            }
            const {
                vehicleTypes,
                priceInCents,
                description,
                bicycle,
                motorcycle,
                car,
                van,
                startAddress,
                finishAddress,
                startLat,
                startLong,
                finishLat,
                finishLong
            } = message;
            const call: Call = await CreateCallController.getController().run(id, vehicleTypes, priceInCents, description, bicycle, motorcycle, car, van, startAddress, finishAddress, startLat, startLong, finishLat, finishLong);
            socket.emit('create-call', call);
        });
    }

    private validateJson(message: any) {
        if (typeof message != 'string') return message;
        try {
            return JSON.parse(message);
        } catch (e) {
            throw Error();
        }
    }

    sendRide(ride: Ride, message: string): void {
        const socketId: string|undefined = this.socketIds.get(ride.getCallerId());
        if(!socketId) return;
        this.io.to(socketId).emit('ride', {
            message,
            ride
        });
    }

}

export {CallerSocketManager};