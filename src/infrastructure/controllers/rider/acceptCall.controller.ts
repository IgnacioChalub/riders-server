import AcceptCallAplicationService from "../../../aplication/aplicationServices/rider/acceptCall.aplicationService";
import IRideRepository from "../../../aplication/repositories/ride.repository";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import {CallerSocketManager} from "../../socket/caller/callerSocketManager";

class AcceptCallController{

    private static acceptCallController: AcceptCallController;

    private acceptCallAplicationService: AcceptCallAplicationService;
    private callerSocketManager: CallerSocketManager;

    constructor(acceptCallAplicationService: AcceptCallAplicationService, callerSocketManager: CallerSocketManager) {
        this.acceptCallAplicationService = acceptCallAplicationService;
        this.callerSocketManager = callerSocketManager;
    }

    static create(): AcceptCallController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const callRepository: ICallRepository = CallDAO.getInstance();
        const acceptCallAplicationService: AcceptCallAplicationService = new AcceptCallAplicationService(rideRepository, callRepository);
        return new AcceptCallController(acceptCallAplicationService, CallerSocketManager.getInstance());
    }

    static getController(): AcceptCallController{
        if(!this.acceptCallController) this.acceptCallController = AcceptCallController.create();
        return this.acceptCallController;
    }

    async run(callId: string, riderId: string): Promise<Ride>{
        const ride: Ride = await this.acceptCallAplicationService.run(callId, riderId);
        this.callerSocketManager.sendRide(ride, "Your ride has been accepted");
        return ride;
    }
}

export default AcceptCallController;