import {Server as WebSocketServer, Socket} from "socket.io";
import {tokenValidation} from "../../router/shared/tokenValidation";
import Call from "../../../domain/entities/call";
import CreateCallController from "../../controllers/caller/createCall.controller";
import validate from "../schemaValidator";
import {Ride} from "../../../domain/entities/ride";
import messageSchema from "./schemas/callSchema";

/**
 * 
    LISTENERS: 'connection', 'private-message', 'ride'
 */


class RideParticipants{
    callerId: string;
    riderId: string;

    constructor(callerId: string, riderId: string){
        this.callerId = callerId;
        this.riderId = riderId;
    }
}

class CallerSocketManager{

    static instance: CallerSocketManager;

    private io: WebSocketServer;

    private callerSocketIds = new Map<any, string>();
    private ridersSocketIds = new Map<any, string>();
    private rides = new Map<any, RideParticipants>();

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
            const userType: string = <string>socket.handshake.headers['user-type'];
            this.createConnection(socket, token, userType);
            this.createSendMessageListener(socket);
        });
    }

    private createConnection(socket: Socket, token: string, userType: string): void {
        try{
            if(userType == 'rider'){
                const id: string = tokenValidation(token, 'rider');
                this.ridersSocketIds.set(id, socket.id);
                socket.emit('connection', {connected: true});
            }else if(userType == 'caller'){
                const id: string = tokenValidation(token, 'caller');
                this.callerSocketIds.set(id, socket.id);
                socket.emit('connection', {connected: true});
            }else{
                throw Error("User type missing in header.")
            }
        }catch (e: any) {
            socket.emit('connection', {error: e.message});
            socket.disconnect(true);
        }
    }

    private createSendMessageListener(socket: Socket): void {
        socket.on('private-message', async (message: any) => {

            //validate message format
            try{
                message = this.validateJson(message);
            }catch(e){
                socket.emit('private-message', {error: "invalid message"});
                return;
            }
            if(!await validate(messageSchema, message)){
                socket.emit('private-message', {error: "invalid message"});
                return;
            }
            
            //auth 
            const token: string = <string>socket.handshake.headers['auth-token'];
            const userType: string = <string>socket.handshake.headers['user-type'];
            let id: string = "";
            try{
                id = tokenValidation(token, userType);
            }catch(e: any){
                socket.emit('private-message', {error: e.message});
                socket.disconnect(true);
                return;
            }

            const {rideId, text} = message;
            const ride = this.rides.get(rideId)
            if(!ride){
                socket.emit('private-message', {error: "Ride not found"});
                return;
            }

            if(userType == 'rider'){
                if(id !== ride?.riderId){
                    socket.emit('private-message', {error: "Ride not found"});
                    return;
                }
                const callerId = ride?.callerId;
                const callerSocketId = <string>this.callerSocketIds.get(callerId);
                socket.to(callerSocketId).emit('private-message', {text: text, rideId: rideId});
            }else if(userType == 'caller'){
                if(id !== ride?.callerId){
                    socket.emit('private-message', {error: "Ride not found"});
                    return;
                }
                const riderId = ride?.riderId;
                const ridersSocketId = <string>this.ridersSocketIds.get(riderId);
                socket.to(ridersSocketId).emit('private-message', {text: text});
            }

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

    addRide(rideId: string, callerId: string, riderId: string): void{
        this.rides.set(rideId, new RideParticipants(callerId, riderId));
    }

    finishRide(rideId: string): void{
        this.rides.delete(rideId);
    }

    sendRide(ride: Ride, message: string): void {
        const socketId: string|undefined = this.callerSocketIds.get(ride.getCallerId());
        if(!socketId) return;
        this.io.to(socketId).emit('ride', {
            message,
            ride
        });
    }

}

export {CallerSocketManager};