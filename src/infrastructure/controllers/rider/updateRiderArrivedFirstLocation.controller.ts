import UpdateRiderArrivedFirstLocationAplicationService
    from "../../../aplication/aplicationServices/rider/updateRiderArrivedFirstLocation.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import {Ride} from "../../../domain/entities/ride";
import {CallerSocketManager} from "../../socket/caller/callerSocketManager";
import CallerDAO from "../../persistance/callerDAO";
import EmailService from "../../services/emailServiceImplementation";

class UpdateRiderArrivedFirstLocationController{

    private static updateRiderArrivedFirstLocationController: UpdateRiderArrivedFirstLocationController;

    private updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService;
    private callerSocketManager: CallerSocketManager;

    constructor(updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService, callerSocketManager: CallerSocketManager) {
        this.updateRiderArrivedFirstLocationAplicationService = updateRiderArrivedFirstLocationAplicationService;
        this.callerSocketManager = callerSocketManager;
    }

    static create(): UpdateRiderArrivedFirstLocationController{
        const updateRiderArrivedFirstLocationAplicationService: UpdateRiderArrivedFirstLocationAplicationService = new UpdateRiderArrivedFirstLocationAplicationService(RideDAO.getInstance(), CallerDAO.getInstance(), EmailService.getInstance());
        return new UpdateRiderArrivedFirstLocationController(updateRiderArrivedFirstLocationAplicationService, CallerSocketManager.getInstance());
    }

    static getController(): UpdateRiderArrivedFirstLocationController{
        if(!this.updateRiderArrivedFirstLocationController) this.updateRiderArrivedFirstLocationController = UpdateRiderArrivedFirstLocationController.create();
        return this.updateRiderArrivedFirstLocationController;
    }

    async run(riderId: string): Promise<Ride> {
        const ride: Ride = await this.updateRiderArrivedFirstLocationAplicationService.run(riderId);
        this.callerSocketManager.sendRide(ride, "Rider arrived first location");
        return ride;
    }
}

export  default UpdateRiderArrivedFirstLocationController;