import FinishRideAplicationService from "../../../aplication/aplicationServices/rider/finishRide.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import CallerDAO from "../../persistance/callerDAO";
import {Ride} from "../../../domain/entities/ride";
import {SocketManager} from "../../socket/socketManager";
import EmailService from "../../services/emailServiceImplementation";

class FinishRideController{

    private static finishRideController: FinishRideController;

    private finishRideAplicationService: FinishRideAplicationService;
    private socketManager: SocketManager;

    constructor(finishRideAplicationService: FinishRideAplicationService, socketManager: SocketManager) {
        this.finishRideAplicationService = finishRideAplicationService;
        this.socketManager = socketManager;
    }

    static create(): FinishRideController{
        const finishRideAplicationService: FinishRideAplicationService = new FinishRideAplicationService(RideDAO.getInstance(), CallerDAO.getInstance(), EmailService.getInstance());
        return new FinishRideController(finishRideAplicationService, SocketManager.getInstance());
    }

    static getController(): FinishRideController{
        if(!this.finishRideController) this.finishRideController = FinishRideController.create();
        return this.finishRideController;
    }

    async run(riderId: string, callerDNI: number): Promise<Ride> {
        const ride: Ride = await this.finishRideAplicationService.run(riderId, callerDNI);
        this.socketManager.sendRide(ride, "Ride finished");
        this.socketManager.finishRide(ride.getId());
        return ride;
    }
}
export default FinishRideController;