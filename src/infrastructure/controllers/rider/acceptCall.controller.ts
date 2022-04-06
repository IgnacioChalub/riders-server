import AcceptCallAplicationService from "../../../aplication/aplicationServices/rider/acceptCall.aplicationService";
import IRideRepository from "../../../aplication/repositories/ride.repository";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";

class AcceptCallController{

    private static acceptCallController: AcceptCallController = AcceptCallController.create();

    private acceptCallAplicationService: AcceptCallAplicationService;


    constructor(acceptCallAplicationService: AcceptCallAplicationService) {
        this.acceptCallAplicationService = acceptCallAplicationService;
    }

    static create(): AcceptCallController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const callRepository: ICallRepository = CallDAO.getInstance();
        const acceptCallAplicationService: AcceptCallAplicationService = new AcceptCallAplicationService(rideRepository, callRepository);
        return new AcceptCallController(acceptCallAplicationService);
    }

    static getController(): AcceptCallController{
        return this.acceptCallController;
    }

    async run(callId: string, riderId: string): Promise<Ride>{
        return this.acceptCallAplicationService.run(callId, riderId);
    }
}

export default AcceptCallController;