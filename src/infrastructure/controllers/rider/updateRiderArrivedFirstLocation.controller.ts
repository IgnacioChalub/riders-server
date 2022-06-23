import UpdateRiderArrivedFirstLocationAplicationService
    from "../../../aplication/aplicationServices/rider/updateRiderArrivedFirstLocation.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import {SocketManager} from "../../socket/socketManager";
import CallerDAO from "../../persistance/callerDAO";
import EmailService from "../../services/emailServiceImplementation";

class UpdateRiderArrivedFirstLocationController{

    private static updateRiderArrivedFirstLocationController: UpdateRiderArrivedFirstLocationController;

    private updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService;
    private socketManager: SocketManager;

    constructor(updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService, socketManager: SocketManager) {
        this.updateRiderArrivedFirstLocationAplicationService = updateRiderArrivedFirstLocationAplicationService;
        this.socketManager = socketManager;
    }

    static create(): UpdateRiderArrivedFirstLocationController{
        const updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService = new UpdateRiderArrivedFirstLocationAplicationService(RideDAO.getInstance(), CallerDAO.getInstance(), EmailService.getInstance());
        return new UpdateRiderArrivedFirstLocationController(updateRiderArrivedFirstLocationAplicationService, SocketManager.getInstance());
    }

    static getController(): UpdateRiderArrivedFirstLocationController{
        if(!this.updateRiderArrivedFirstLocationController) this.updateRiderArrivedFirstLocationController = UpdateRiderArrivedFirstLocationController.create();
        return this.updateRiderArrivedFirstLocationController;
    }

    async run(riderId: string): Promise<Ride> {
        const ride: Ride = await this.updateRiderArrivedFirstLocationAplicationService.run(riderId);
        this.socketManager.sendRide(ride, "Rider arrived first location");
        return ride;
    }
}

export  default UpdateRiderArrivedFirstLocationController;