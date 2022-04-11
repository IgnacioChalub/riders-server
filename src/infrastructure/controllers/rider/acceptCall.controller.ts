import AcceptCallAplicationService from "../../../aplication/aplicationServices/rider/acceptCall.aplicationService";
import IRideRepository from "../../../aplication/repositories/ride.repository";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import { CallerSocketManager } from "../../socket/caller/callerSocketManager";
import AcceptCallObservableController from "./observable/observables/acceptCall.observableController";
import IAcceptCallListener from "./observable/listeners/acceptCall.listener";

class AcceptCallController extends AcceptCallObservableController{

    private static acceptCallController: AcceptCallController;

    private acceptCallAplicationService: AcceptCallAplicationService;

    constructor(acceptCallAplicationService: AcceptCallAplicationService) {
        super();
        this.acceptCallAplicationService = acceptCallAplicationService;
    }

    static create(): AcceptCallController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const callRepository: ICallRepository = CallDAO.getInstance();
        const acceptCallAplicationService: AcceptCallAplicationService = new AcceptCallAplicationService(rideRepository, callRepository);
        const acceptCallController: AcceptCallController = new AcceptCallController(acceptCallAplicationService);
        const manager: IAcceptCallListener = CallerSocketManager.getInstance();
        acceptCallController.addListener(manager);   
        return acceptCallController;
    }

    static getController(): AcceptCallController{
        if(!this.acceptCallController){
            this.acceptCallController = this.create();
        }
        return this.acceptCallController;
    }

    async run(callId: string, riderId: string): Promise<Ride>{
        const ride: Ride = await this.acceptCallAplicationService.run(callId, riderId);
        this.notify(ride);
        return ride;
    }
}

export default AcceptCallController;