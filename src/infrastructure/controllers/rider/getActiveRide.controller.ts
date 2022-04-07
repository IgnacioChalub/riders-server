import IRideRepository from "../../../aplication/repositories/ride.repository";
import ICallRepository from "../../../aplication/repositories/call.repository";
import CallDAO from "../../persistance/callDAO";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import GetActiveRideAplicationService
    from "../../../aplication/aplicationServices/rider/getActiveRide.aplicationService";

class GetActiveRideController{

    private static getActiveRideController: GetActiveRideController = GetActiveRideController.create();

    private getActiveRideAplicationService: GetActiveRideAplicationService;


    constructor(getActiveRideAplicationService: GetActiveRideAplicationService) {
        this.getActiveRideAplicationService = getActiveRideAplicationService;
    }

    static create(): GetActiveRideController{
        const rideRepository: IRideRepository = RideDAO.getInstance();
        const callRepository: ICallRepository = CallDAO.getInstance();
        const getActiveRideAplicationService: GetActiveRideAplicationService = new GetActiveRideAplicationService(rideRepository, callRepository);
        return new GetActiveRideController(getActiveRideAplicationService);
    }

    static getController(): GetActiveRideController{
        return this.getActiveRideController;
    }

    async run(riderId: string): Promise<Ride>{
        return this.getActiveRideAplicationService.run( riderId);
    }
}

export default GetActiveRideController;