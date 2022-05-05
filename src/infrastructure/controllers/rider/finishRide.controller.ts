import FinishRideAplicationService from "../../../aplication/aplicationServices/rider/finishRide.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import CallerDAO from "../../persistance/callerDAO";
import {Ride} from "../../../domain/entities/ride";
import {CallerSocketManager} from "../../socket/caller/callerSocketManager";

class FinishRideController{

    private static finishRideController: FinishRideController;

    private finishRideAplicationService: FinishRideAplicationService;
    private callerSocketManager: CallerSocketManager;

    constructor(finishRideAplicationService: FinishRideAplicationService, callerSocketManager: CallerSocketManager) {
        this.finishRideAplicationService = finishRideAplicationService;
        this.callerSocketManager = callerSocketManager;
    }

    static create(): FinishRideController{
        const finishRideAplicationService: FinishRideAplicationService = new FinishRideAplicationService(RideDAO.getInstance(), CallerDAO.getInstance());
        return new FinishRideController(finishRideAplicationService, CallerSocketManager.getInstance());
    }

    static getController(): FinishRideController{
        if(!this.finishRideController) this.finishRideController = FinishRideController.create();
        return this.finishRideController;
    }

    async run(riderId: string, callerDNI: number): Promise<Ride> {
        const ride: Ride = await this.finishRideAplicationService.run(riderId, callerDNI);
        this.callerSocketManager.sendRide(ride);
        return ride;
    }
}
export default FinishRideController;