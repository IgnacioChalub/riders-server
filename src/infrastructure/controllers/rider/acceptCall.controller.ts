import AcceptCallAplicationService from "../../../aplication/aplicationServices/rider/acceptCall.aplicationService";
import IRideRepository from "../../../aplication/repositories/ride.repository";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import ICallerRepository from "../../../aplication/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import EmailService from "../../services/emailServiceImplementation";
import { SocketManager } from "../../socket/socketManager";

class AcceptCallController{

    private static acceptCallController: AcceptCallController;

    private acceptCallAplicationService: AcceptCallAplicationService;
    private socketManager: SocketManager;

    constructor(acceptCallAplicationService: AcceptCallAplicationService, socketManager: SocketManager) {
        this.acceptCallAplicationService = acceptCallAplicationService;
        this.socketManager = socketManager;
    }

    static create(): AcceptCallController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const callRepository: ICallRepository = CallDAO.getInstance();
        const riderRepository: IRiderRepository = RiderDAO.getInstance();
        const callerRepository: ICallerRepository = CallerDAO.getInstance();
        const acceptCallAplicationService: AcceptCallAplicationService = new AcceptCallAplicationService(rideRepository, callRepository, riderRepository, callerRepository, EmailService.getInstance());
        return new AcceptCallController(acceptCallAplicationService, SocketManager.getInstance());
    }

    static getController(): AcceptCallController{
        if(!this.acceptCallController) this.acceptCallController = AcceptCallController.create();
        return this.acceptCallController;
    }

    async run(callId: string, riderId: string): Promise<Ride>{
        const ride: Ride = await this.acceptCallAplicationService.run(callId, riderId);
        this.socketManager.sendRide(ride, "Your ride has been accepted");
        this.socketManager.addRide(ride.getId(), ride.getCallerId(), ride.getRiderId());
        return ride;
    }
}

export default AcceptCallController;