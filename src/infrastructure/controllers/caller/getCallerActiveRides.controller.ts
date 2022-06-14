import GetCallerActiveRidesAplicationService from "../../../aplication/aplicationServices/caller/getCallerActiveRides.aplicationService";
import { Ride } from "../../../domain/entities/ride";
import RideDAO from "../../persistance/rideDAO";

class GetCallerActiveRidesController{

    private static getCallerActiveRidesController: GetCallerActiveRidesController;

    private getCallerActiveRidesAplicationService: GetCallerActiveRidesAplicationService;

    constructor(getCallerActiveRidesAplicationService: GetCallerActiveRidesAplicationService){
        this.getCallerActiveRidesAplicationService = getCallerActiveRidesAplicationService;
    }

    static create(): GetCallerActiveRidesController{
        const getCallerActiveRidesAplicationService: GetCallerActiveRidesAplicationService = new GetCallerActiveRidesAplicationService(RideDAO.getInstance()); 
        return new GetCallerActiveRidesController(getCallerActiveRidesAplicationService);
    }

    static getController(): GetCallerActiveRidesController{
        if(!this.getCallerActiveRidesController) this.getCallerActiveRidesController = GetCallerActiveRidesController.create();
        return this.getCallerActiveRidesController;
    } 

    async run(callerId: string): Promise<Ride[]> {
        return await this.getCallerActiveRidesAplicationService.run(callerId);
    }
}

export default GetCallerActiveRidesController;